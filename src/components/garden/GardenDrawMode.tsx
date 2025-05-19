import React from "react";
import { Garden } from "../../api/fetchGarden";

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
  return (
    <div className="border overflow-hidden relative">
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white bg-opacity-70 px-4 py-2 rounded-lg shadow">
          <p>Draw mode - Functionality coming soon</p>
        </div>
      </div>
    </div>
  );
};
