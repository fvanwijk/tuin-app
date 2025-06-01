import React, { useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

import { Garden } from '../../api/fetchGarden';
import { colorMap } from './colors';
import { useGardenDimensions } from '../../hooks/useGardenDimensions';
import { useGardenMapPoints } from '../../hooks/useGardenMapPoints';
import { usePlantsQuery } from '../../hooks/usePlants';
import { Card } from '../ui/Card';
import { getPlantTypeLabel } from '../plants/utils';

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

  // State to track the selected plant point
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  // Find the selected plant based on the selected point
  const selectedPoint = gardenMapPoints?.find((point) => point.id === selectedPointId);
  const selectedPlant = selectedPoint ? plants?.find((p) => p.id === selectedPoint.plant_id) : null;

  // Function to handle circle click
  const handleCircleClick = (pointId: string) => {
    // Toggle selection if clicking the same circle, otherwise select the new one
    setSelectedPointId((prevId) => (prevId === pointId ? null : pointId));
  };

  // Helper function to get colors as array
  const getColors = (colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(',').map((color) => color.trim());
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
            pointerEvents: 'auto', // Change to auto to allow interactions
          }}
        >
          <Layer>
            {gardenMapPoints.map((point) => {
              const plant = plants?.find((p) => p.id === point.plant_id);
              const color = plant?.color?.split(',')[0] || '#808080';
              const isSelected = point.id === selectedPointId;
              const style = {
                fill: color + '80', // 80 is 50% opacity in hex
                stroke: color,
                strokeWidth: isSelected ? 3 : 2,
              };
              return (
                <Circle
                  key={point.id}
                  id={point.id}
                  strokeScaleEnabled={false}
                  x={meterToPixelScale(point.x)}
                  y={meterToPixelScale(point.y)}
                  radius={meterToPixelScale(point.radius || 0.5)}
                  onClick={() => handleCircleClick(point.id)}
                  onTap={() => handleCircleClick(point.id)}
                  cursor={plant ? 'pointer' : 'default'}
                  {...style}
                />
              );
            })}
          </Layer>
        </Stage>
      )}

      {/* Plant details card that shows when a plant is selected */}
      {selectedPlant && (
        <div className="absolute right-4 bottom-4 w-80 z-10">
          <Card className="border border-green-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{selectedPlant.name_nl || selectedPlant.name}</h3>
              <button onClick={() => setSelectedPointId(null)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {selectedPlant.name_nl && (
                <div className="flex">
                  <div className="w-32 font-medium text-gray-700">Latijnse naam:</div>
                  <div className="italic">{selectedPlant.name}</div>
                </div>
              )}

              <div className="flex">
                <div className="w-32 font-medium text-gray-700">Type:</div>
                <div>{getPlantTypeLabel(selectedPlant.type)}</div>
              </div>

              <div className="flex items-center">
                <div className="w-32 font-medium text-gray-700">Status:</div>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${selectedPlant.alive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="ml-2">{selectedPlant.alive ? 'Levend' : 'Niet meer aanwezig'}</span>
                </div>
              </div>

              {selectedPlant.color && (
                <div className="flex">
                  <div className="w-32 font-medium text-gray-700">Kleuren:</div>
                  <div className="flex flex-wrap gap-1">
                    {getColors(selectedPlant.color).map((color, index) => (
                      <div key={`color-${index}`} className="flex items-center">
                        <span
                          className="h-4 w-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></span>
                        <span className="ml-1 text-xs">{colorMap.get(color)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlant.borders && selectedPlant.borders.length > 0 && (
                <div className="flex">
                  <div className="w-32 font-medium text-gray-700">Borders:</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPlant.borders.map((border) => (
                      <span key={border.id} className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        {border.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlant.comments && (
                <div className="mt-2">
                  <div className="font-medium text-gray-700">Notities:</div>
                  <p className="text-gray-600 whitespace-pre-wrap text-xs mt-1">{selectedPlant.comments}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
