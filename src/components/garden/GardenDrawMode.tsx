import React, { useEffect, useRef, useState } from "react";
import { Garden } from "../../api/fetchGarden";
import { Stage, Layer, Circle, Transformer } from "react-konva";
import Konva from "konva";
import {
  useGardenMapPoints,
  useAddGardenMapPointMutation,
  useUpdateGardenMapPointMutation,
  useDeleteGardenMapPointMutation,
} from "../../hooks/useGardenMapPoints";
import { GardenMapPointInput } from "../../api/fetchGardenMapPoints";
import { useGardenDimensions } from "../../hooks/useGardenDimensions";

interface GardenDrawModeProps {
  floorplanUrl: string;
  garden: Garden;
  aspectRatio: string;
}

export const GardenDrawMode: React.FC<GardenDrawModeProps> = ({
  floorplanUrl,
  garden,
  aspectRatio,
}) => {
  // Use the shared hook for dimensions and scaling
  const { containerRef, dimensions, meterToPixelScale } =
    useGardenDimensions(garden);

  const [circles, setCircles] = useState<
    Array<{ id: string; x: number; y: number; radius: number }>
  >([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const circleRefs = useRef<Map<string, Konva.Circle>>(new Map());
  const transformerRef = useRef<Konva.Transformer>(null);

  // Get map points from database
  const { data: gardenMapPoints, isLoading } = useGardenMapPoints(garden.id);
  const addGardenMapPoint = useAddGardenMapPointMutation();
  const updateGardenMapPoint = useUpdateGardenMapPointMutation();
  const deleteGardenMapPoint = useDeleteGardenMapPointMutation(garden.id);

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
  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && selectedId) {
      setSelectedId(null);
      return true; // Indicate that we handled a deselection
    }
    return false; // No deselection happened
  };

  const handleStageClick = async (e: Konva.KonvaEventObject<MouseEvent>) => {
    // If we deselected something, don't add a new circle
    if (checkDeselect(e)) {
      return;
    }

    // Only add a circle if nothing is selected and we didn't click on an existing object
    if (!selectedId && !e.target.attrs.id) {
      // Get click position relative to the stage
      const stage = e.target.getStage();
      const pointerPosition = stage?.getPointerPosition();

      if (!pointerPosition) return;

      // Convert pixel position to meters
      const xInMeters = meterToPixelScale.invert(pointerPosition.x);
      const yInMeters = meterToPixelScale.invert(pointerPosition.y);

      // Generate a new temporary ID for the circle
      const tempId = crypto.randomUUID();

      try {
        // Circle to add to database
        const newPointData: GardenMapPointInput = {
          garden_id: garden.id,
          x: xInMeters,
          y: yInMeters,
          radius: 0.5,
        };

        const { x, y, radius } = newPointData;

        // Optimistically update UI
        setCircles([...circles, { x, y, radius, id: tempId }]);

        // Save to database
        const result = await addGardenMapPoint.mutateAsync(newPointData);

        // Update with actual database ID
        if (result.data) {
          setCircles((prevCircles) =>
            prevCircles.map((c) =>
              c.id === tempId ? { ...c, id: result.data!.id } : c
            )
          );
          setSelectedId(result.data.id);
        }
      } catch (error) {
        console.error("Error saving garden map point:", error);
        // Remove the temporary circle if saving failed
        setCircles((prevCircles) => prevCircles.filter((c) => c.id !== tempId));
      }
    }
  };

  const handleCircleClick = (
    e: Konva.KonvaEventObject<MouseEvent>,
    id: string
  ) => {
    e.cancelBubble = true; // Stop propagation to prevent stage click
    setSelectedId(id);
  };

  const handleCircleDragEnd = async (
    e: Konva.KonvaEventObject<DragEvent>,
    id: string
  ) => {
    // Get the new position
    const circle = e.target as Konva.Circle;
    const newX = meterToPixelScale.invert(circle.x());
    const newY = meterToPixelScale.invert(circle.y());

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
      })
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
      console.error("Error updating garden map point position:", error);
    }
  };

  const handleTransformEnd = async (
    _e: Konva.KonvaEventObject<Event>,
    id: string
  ) => {
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
      })
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
      console.error("Error updating garden map point after transform:", error);
    }

    // Reset scale to prevent continuous accumulation
    node.scaleX(1);
    node.scaleY(1);
  };

  // Handle deletion on Delete or Backspace key press
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        // Remove from local state
        setCircles(circles.filter((c) => c.id !== selectedId));
        setSelectedId(null);

        // Delete from database
        try {
          await deleteGardenMapPoint.mutateAsync(selectedId);
        } catch (error) {
          console.error("Error deleting garden map point:", error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  return (
    <div className="border overflow-hidden relative" ref={containerRef}>
      <img
        src={floorplanUrl}
        alt="Tuinplattegrond"
        className="w-full h-auto object-contain block"
        style={{
          aspectRatio,
          transform: `translate(${garden.position_x || 0}px, ${
            garden.position_y || 0
          }px) scale(${garden.scale || 1})`,
          transformOrigin: "left top",
          cursor: "crosshair",
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
          style={{ position: "absolute", top: 0, left: 0 }}
          onClick={handleStageClick}
        >
          <Layer>
            {circles.map((circle, i) => (
              <Circle
                key={i}
                id={circle.id}
                strokeScaleEnabled={false}
                x={meterToPixelScale(circle.x)}
                y={meterToPixelScale(circle.y)}
                radius={meterToPixelScale(circle.radius)}
                fill="rgba(0, 150, 136, 0.5)"
                stroke={"rgba(0, 150, 136, 1)"}
                strokeWidth={2}
                draggable
                onClick={(e) => handleCircleClick(e, circle.id)}
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
            ))}
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limit resize to reasonable values
                if (newBox.width < 10 || newBox.height < 10) {
                  return oldBox;
                }
                return newBox;
              }}
              enabledAnchors={["bottom-right"]}
              centeredScaling
              ignoreStroke={true}
              rotateEnabled={false}
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
};
