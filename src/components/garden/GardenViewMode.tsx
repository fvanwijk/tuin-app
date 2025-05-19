import React from "react";
import { Garden } from "../../api/fetchGarden";

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
  return (
    <div className="border overflow-hidden">
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
    </div>
  );
};
