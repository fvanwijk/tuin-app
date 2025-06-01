import React from 'react';
import { Circle, Layer, Stage } from 'react-konva';

import { Garden } from '../../api/fetchGarden';
import { useGardenDimensions } from '../../hooks/useGardenDimensions';
import { useGardenMapPoints } from '../../hooks/useGardenMapPoints';
import { usePlantsQuery } from '../../hooks/usePlants';

interface GardenViewModeProps {
  floorplanUrl: string;
  garden: Garden;
  aspectRatio: string;
}

export const GardenViewMode: React.FC<GardenViewModeProps> = ({ floorplanUrl, garden, aspectRatio }) => {
  // Use the shared hook for dimensions and scaling
  const { containerRef, dimensions, meterToPixelScale } = useGardenDimensions(garden);

  const { data: gardenMapPoints, isLoading } = useGardenMapPoints(garden.id);
  const { data: plants } = usePlantsQuery();

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
        }}
      />

      {dimensions.width > 0 && !isLoading && gardenMapPoints && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          <Layer>
            {gardenMapPoints.map((point) => {
              const plant = plants?.find((p) => p.id === point.plant_id);
              const color = plant?.color?.split(',')[0] || '#808080';
              const style = {
                fill: color + '80', // 80 is 50% opacity in hex,,
                stroke: color,
              };
              return (
                <Circle
                  key={point.id}
                  id={point.id}
                  strokeScaleEnabled={false}
                  x={meterToPixelScale(point.x)}
                  y={meterToPixelScale(point.y)}
                  radius={meterToPixelScale(point.radius || 0.5)}
                  strokeWidth={2}
                  {...style}
                />
              );
            })}
          </Layer>
        </Stage>
      )}
    </div>
  );
};
