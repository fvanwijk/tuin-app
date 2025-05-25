import React from "react";
import { Garden } from "../../api/fetchGarden";
import { Stage, Layer, Circle } from "react-konva";
import { useGardenMapPoints } from "../../hooks/useGardenMapPoints";
import { useGardenDimensions } from "../../hooks/useGardenDimensions";

interface GardenViewModeProps {
  floorplanUrl: string;
  garden: Garden;
  aspectRatio: string;
}

export const GardenViewMode: React.FC<GardenViewModeProps> = ({
  floorplanUrl,
  garden,
  aspectRatio,
}) => {
  // Use the shared hook for dimensions and scaling
  const { containerRef, dimensions, meterToPixelScale } =
    useGardenDimensions(garden);

  // Fetch garden map points from the database
  const { data: gardenMapPoints, isLoading } = useGardenMapPoints(garden.id);

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
        }}
      />

      {dimensions.width > 0 && !isLoading && gardenMapPoints && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          <Layer>
            {gardenMapPoints.map((point) => (
              <Circle
                key={point.id}
                id={point.id}
                strokeScaleEnabled={false}
                x={meterToPixelScale(point.x)}
                y={meterToPixelScale(point.y)}
                radius={meterToPixelScale(point.radius || 0.5)}
                fill="rgba(0, 150, 136, 0.5)"
                stroke={"rgba(0, 150, 136, 1)"}
                strokeWidth={2}
              />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
};
