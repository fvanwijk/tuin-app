import React, { useEffect, useRef, useState } from "react";
import { Garden } from "../../api/fetchGarden";
import { Stage, Layer, Circle } from "react-konva";
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
    Array<{ id: string; x: number; y: number }>
  >([]);

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

  const handleStageClick = (e: any) => {
    // Get click position relative to the stage
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    // Convert pixel position to meters
    const xInMeters = meterToPixelScale.invert(pointerPosition.x);
    const yInMeters = meterToPixelScale.invert(pointerPosition.y);

    // Add a new circle at the click position (stored in meters)
    setCircles([
      ...circles,
      { x: xInMeters, y: yInMeters, id: crypto.randomUUID() },
    ]);
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
              x={meterToPixelScale(circle.x)}
              y={meterToPixelScale(circle.y)}
              radius={meterToPixelScale(circleRadius)}
              fill="rgba(0, 150, 136, 0.5)"
              stroke="rgba(0, 150, 136, 1)"
              strokeWidth={2}
              draggable
              onDragEnd={(e) => handleCircleDragEnd(e, circle.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
