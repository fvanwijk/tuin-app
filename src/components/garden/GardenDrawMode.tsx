import React, { useEffect, useRef, useState } from "react";
import { Garden } from "../../api/fetchGarden";
import { Stage, Layer, Circle, Transformer } from "react-konva";
import { scaleLinear } from "d3-scale";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [circles, setCircles] = useState<
    Array<{ id: string; x: number; y: number; radius?: number }>
  >([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const circleRefs = useRef<Map<string, any>>(new Map());
  const transformerRef = useRef<any>(null);

  // Assuming garden width is 10 meters (adjust as needed)
  const meterToPixelScale = scaleLinear()
    .domain([0, garden.width])
    .range([0, dimensions.width]);

  // Circle radius in meters
  const circleRadius = 0.5;

  const updateDimensions = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Check if a click occurred on empty space to deselect
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && selectedId) {
      setSelectedId(null);
      return true; // Indicate that we handled a deselection
    }
    return false; // No deselection happened
  };

  const handleStageClick = (e: any) => {
    // If we deselected something, don't add a new circle
    if (checkDeselect(e)) {
      return;
    }

    // Only add a circle if nothing is selected and we didn't click on an existing object
    if (!selectedId && !e.target.attrs.id) {
      // Get click position relative to the stage
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();

      // Convert pixel position to meters
      const xInMeters = meterToPixelScale.invert(pointerPosition.x);
      const yInMeters = meterToPixelScale.invert(pointerPosition.y);

      // Generate a new ID for the circle
      const newId = crypto.randomUUID();

      // Add a new circle at the click position (stored in meters)
      setCircles([
        ...circles,
        { x: xInMeters, y: yInMeters, id: newId, radius: circleRadius },
      ]);

      // Select the newly added circle
      setSelectedId(newId);
    }
  };

  const handleCircleClick = (e: any, id: string) => {
    e.cancelBubble = true; // Stop propagation to prevent stage click
    setSelectedId(id);
  };

  const handleCircleDragEnd = (e: any, id: string) => {
    // Update circle position after drag (convert from pixels to meters)
    setCircles(
      circles.map((circle) => {
        if (circle.id === id) {
          return {
            ...circle,
            x: meterToPixelScale.invert(e.target.x()),
            y: meterToPixelScale.invert(e.target.y()),
          };
        }
        return circle;
      })
    );
  };

  const handleTransformEnd = (e: any, id: string) => {
    // Get the transformed node
    const node = circleRefs.current.get(id);
    if (!node) return;

    // Find circle by id
    const circle = circles.find((c) => c.id === id);
    if (!circle) return;

    // Get scale values from the transformed node
    const scaleX = node.scaleX();

    // Calculate new radius based on the scale
    const newRadiusInMeters = (circle.radius || circleRadius) * scaleX;

    // Update circle with new properties - convert to meters
    setCircles(
      circles.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            x: meterToPixelScale.invert(node.x()),
            y: meterToPixelScale.invert(node.y()),
            radius: newRadiusInMeters,
          };
        }
        return c;
      })
    );

    // Reset scale to prevent continuous accumulation
    node.scaleX(1);
    node.scaleY(1);
  };

  // Effect to update transformer nodes when selection changes
  useEffect(() => {
    if (selectedId && transformerRef.current) {
      const selectedNode = circleRefs.current.get(selectedId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
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
              radius={meterToPixelScale(circle.radius || circleRadius)}
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
    </div>
  );
};
