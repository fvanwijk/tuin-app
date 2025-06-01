import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Circle, Layer, Stage, Transformer } from 'react-konva';

import { Garden } from '../../api/fetchGarden';
import { GardenMapPointInput } from '../../api/fetchGardenMapPoints';
import { useGardenDimensions } from '../../hooks/useGardenDimensions';
import {
  useAddGardenMapPointMutation,
  useDeleteGardenMapPointMutation,
  useGardenMapPoints,
  useUpdateGardenMapPointMutation,
} from '../../hooks/useGardenMapPoints';
import { usePlantsQuery } from '../../hooks/usePlants';
import { MapPointForm } from './MapPointForm';

interface GardenDrawModeProps {
  floorplanUrl: string;
  garden: Garden;
  aspectRatio: string;
}

export const GardenDrawMode: React.FC<GardenDrawModeProps> = ({ floorplanUrl, garden, aspectRatio }) => {
  // Use the shared hook for dimensions and scaling
  const { containerRef, dimensions, meterToPixelScale } = useGardenDimensions(garden);

  const [circles, setCircles] = useState<Array<{ id: string; x: number; y: number; radius: number }>>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newCirclePos, setNewCirclePos] = useState<{
    id: string;
    x: number;
    y: number;
    radius: number;
  } | null>(null);
  const circleRefs = useRef<Map<string, Konva.Circle>>(new Map());
  const transformerRef = useRef<Konva.Transformer>(null);

  // Get map points from database
  const { data: gardenMapPoints, isLoading } = useGardenMapPoints(garden.id);
  const addGardenMapPoint = useAddGardenMapPointMutation();
  const updateGardenMapPoint = useUpdateGardenMapPointMutation();
  const deleteGardenMapPoint = useDeleteGardenMapPointMutation(garden.id);

  // Get plants data for colors
  const { data: plants = [] } = usePlantsQuery();

  // Load existing garden map points from database
  useEffect(() => {
    if (gardenMapPoints && gardenMapPoints.length > 0) {
      const loadedCircles = gardenMapPoints.map((point) => ({
        id: point.id,
        x: point.x,
        y: point.y,
        radius: point.radius,
      }));

      setCircles(loadedCircles);
    }
  }, [gardenMapPoints]);

  // Check if a click occurred on empty space to deselect
  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && selectedId) {
      setSelectedId(null);
      return true; // Indicate that we handled a deselection
    }
    return false; // No deselection happened
  };

  // Calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Handle stage mouse down - start drawing a new circle
  const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // If we deselected something, don't add a new circle
    if (checkDeselect(e)) {
      return;
    }

    // Only start drawing if nothing is selected and we didn't click on an existing object
    if (!selectedId && !e.target.attrs.id) {
      // Get click position relative to the stage
      const stage = e.target.getStage();
      const pointerPosition = stage?.getPointerPosition();

      if (!pointerPosition) return;

      setIsDrawing(true);

      const newCircle = {
        id: crypto.randomUUID(),
        x: meterToPixelScale.invert(pointerPosition.x),
        y: meterToPixelScale.invert(pointerPosition.y),
        radius: 0.1,
      };

      // Set the new circle position for tracking during mouse move
      setNewCirclePos(newCircle);

      // Add circle to state
      setCircles([...circles, newCircle]);
    }
  };

  // Handle stage mouse move - update circle radius while drawing
  const handleStageMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing || !newCirclePos) return;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (!pointerPosition) return;

    // Calculate the distance from the center point to current mouse position
    const centerX = meterToPixelScale(newCirclePos.x);
    const centerY = meterToPixelScale(newCirclePos.y);

    // Calculate radius in pixels then convert to meters
    const radiusInPixels = getDistance(centerX, centerY, pointerPosition.x, pointerPosition.y);

    const radiusInMeters = meterToPixelScale.invert(radiusInPixels) - meterToPixelScale.invert(0);

    // Update the circle with the new radius
    setCircles(
      circles.map((c) => {
        if (c.id === newCirclePos.id) {
          return { ...c, radius: Math.max(0.1, radiusInMeters) };
        }
        return c;
      }),
    );

    // Update the tracking state
    setNewCirclePos({
      ...newCirclePos,
      radius: Math.max(0.1, radiusInMeters),
    });
  };

  // Handle stage mouse up - finish drawing and save the circle
  const handleStageMouseUp = async () => {
    // Only proceed if we were drawing a circle
    if (isDrawing && newCirclePos) {
      try {
        // Use default radius of 0.5 meters if radius is still at the initial value (0.1)
        // This means the user just clicked without dragging
        const finalRadius = Math.abs(newCirclePos.radius - 0.1) < 0.01 ? 0.5 : newCirclePos.radius;

        // Save the circle to the database
        const newPointData: GardenMapPointInput = {
          garden_id: garden.id,
          x: newCirclePos.x,
          y: newCirclePos.y,
          radius: finalRadius,
        };

        // Update circle visually with final radius
        setCircles(
          circles.map((c) => {
            if (c.id === newCirclePos.id) {
              return { ...c, radius: finalRadius };
            }
            return c;
          }),
        );

        // Save to database
        const result = await addGardenMapPoint.mutateAsync(newPointData);

        // Update with actual database ID
        if (result.data) {
          setCircles((prevCircles) =>
            prevCircles.map((c) => (c.id === newCirclePos.id ? { ...c, id: result.data!.id } : c)),
          );
          setSelectedId(result.data.id);
        }
      } catch (error) {
        console.error('Error saving garden map point:', error);
        // Remove the temporary circle if saving failed
        setCircles((prevCircles) => prevCircles.filter((c) => c.id !== newCirclePos.id));
      } finally {
        // Reset the drawing state
        setIsDrawing(false);
        setNewCirclePos(null);
      }
    }
  };

  const handleCircleClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>, id: string) => {
    e.cancelBubble = true; // Stop propagation to prevent stage click
    setSelectedId(id);
  };

  const handleCircleDragEnd = async (e: Konva.KonvaEventObject<Event>, id: string) => {
    // Get the new position
    const node = e.target as Konva.Circle;
    const newX = meterToPixelScale.invert(node.x());
    const newY = meterToPixelScale.invert(node.y());

    // Update local state
    setCircles(
      circles.map((circle) => {
        if (circle.id === id) {
          return {
            ...circle,
            x: newX,
            y: newY,
          };
        }
        return circle;
      }),
    );

    // Update in database
    try {
      await updateGardenMapPoint.mutateAsync({
        id,
        updates: {
          x: newX,
          y: newY,
        },
      });
    } catch (error) {
      console.error('Error updating garden map point position:', error);
    }
  };

  const handleTransformEnd = async (_e: Konva.KonvaEventObject<Event>, id: string) => {
    // Get the transformed node
    const node = circleRefs.current.get(id);
    if (!node) return;

    // Find circle by id
    const circle = circles.find((c) => c.id === id);
    if (!circle) return;

    // Get scale values from the transformed node
    const scaleX = node.scaleX();

    // Calculate new radius based on the scale
    const newRadiusInMeters = circle.radius * scaleX;
    const newX = meterToPixelScale.invert(node.x());
    const newY = meterToPixelScale.invert(node.y());

    // Update local state
    setCircles(
      circles.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            x: newX,
            y: newY,
            radius: newRadiusInMeters,
          };
        }
        return c;
      }),
    );

    // Update in database
    try {
      await updateGardenMapPoint.mutateAsync({
        id,
        updates: {
          x: newX,
          y: newY,
          radius: newRadiusInMeters,
        },
      });
    } catch (error) {
      console.error('Error updating garden map point after transform:', error);
    }

    // Reset scale to prevent continuous accumulation
    node.scaleX(1);
    node.scaleY(1);
  };

  // Handle deletion on Delete or Backspace key press
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        // Remove from local state
        setCircles(circles.filter((c) => c.id !== selectedId));
        setSelectedId(null);

        // Delete from database
        try {
          await deleteGardenMapPoint.mutateAsync(selectedId);
        } catch (error) {
          console.error('Error deleting garden map point:', error);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, circles, deleteGardenMapPoint]);

  // Effect to update transformer nodes when selection changes
  useEffect(() => {
    if (selectedId && transformerRef.current) {
      const selectedNode = circleRefs.current.get(selectedId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  // Effect to update circle visuals when map points data changes
  // This ensures the circles stay in sync with form changes
  useEffect(() => {
    if (gardenMapPoints && gardenMapPoints.length > 0) {
      // Update circle positions, radius and keep ids consistent
      setCircles(
        gardenMapPoints.map((point) => ({
          id: point.id,
          x: point.x,
          y: point.y,
          radius: point.radius,
        })),
      );
    }
  }, [gardenMapPoints]);

  // Find the selected map point data from gardenMapPoints
  const selectedMapPoint = selectedId ? gardenMapPoints?.find((point) => point.id === selectedId) : null;

  // Function to get circle color based on the associated plant
  const getCircleColor = (circleId: string) => {
    const neutralColor = 'rgba(128, 128, 128, 0.5)'; // Gray color for circles without plants
    const neutralStroke = 'rgba(128, 128, 128, 1)';

    // If we're drawing this circle currently, make it transparent
    if (isDrawing && newCirclePos?.id === circleId) {
      return {
        fill: 'transparent',
        stroke: 'rgba(0, 150, 136, 1)', // Keep the outline visible
      };
    }

    // Find the map point details
    const mapPoint = gardenMapPoints?.find((point) => point.id === circleId);
    if (!mapPoint || !mapPoint.plant_id) {
      // No plant is associated with this circle
      return {
        fill: neutralColor,
        stroke: neutralStroke,
      };
    }

    // Find the plant with its color
    const plant = plants.find((p) => p.id === mapPoint.plant_id);
    if (!plant || !plant.color) {
      return {
        fill: neutralColor,
        stroke: neutralStroke,
      };
    }

    return {
      fill: plant.color + '80', // 80 is 50% opacity in hex,
      stroke: plant.color,
    };
  };

  return (
    <div className="border overflow-hidden relative" ref={containerRef}>
      <img
        src={floorplanUrl}
        alt="Tuinplattegrond"
        className="w-full h-auto object-contain block"
        style={{
          aspectRatio,
          transform: `translate(${garden.position_x || 0}px, ${garden.position_y || 0}px) scale(${garden.scale || 1})`,
          transformOrigin: 'left top',
          cursor: 'crosshair',
        }}
      />
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <div className="text-green-600">Kaartpunten laden...</div>
        </div>
      ) : (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          style={{ position: 'absolute', top: 0, left: 0 }}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          onTouchStart={handleStageMouseDown}
          onTouchMove={handleStageMouseMove}
          onTouchEnd={handleStageMouseUp}
        >
          <Layer>
            {circles.map((circle, i) => {
              const { fill, stroke } = getCircleColor(circle.id);
              return (
                <Circle
                  key={i}
                  id={circle.id}
                  strokeScaleEnabled={false}
                  x={meterToPixelScale(circle.x)}
                  y={meterToPixelScale(circle.y)}
                  radius={meterToPixelScale(circle.radius)}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={2}
                  draggable
                  onClick={(e) => handleCircleClick(e, circle.id)}
                  onTap={(e) =>
                    handleCircleClick(e as unknown as Konva.KonvaEventObject<MouseEvent | TouchEvent>, circle.id)
                  }
                  onDragEnd={(e) => handleCircleDragEnd(e, circle.id)}
                  onTransformEnd={(e) => handleTransformEnd(e, circle.id)}
                  ref={(node) => {
                    if (node) {
                      circleRefs.current.set(circle.id, node);
                    } else {
                      circleRefs.current.delete(circle.id);
                    }
                  }}
                />
              );
            })}
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit resize to reasonable values
                if (newBox.width < 10 || newBox.height < 10) {
                  return oldBox;
                }
                return newBox;
              }}
              enabledAnchors={['bottom-right']}
              centeredScaling
              ignoreStroke={true}
              rotateEnabled={false}
            />
          </Layer>
        </Stage>
      )}

      {/* Display the MapPointForm when a circle is selected */}
      {selectedMapPoint && <MapPointForm selectedPoint={selectedMapPoint} />}
    </div>
  );
};
