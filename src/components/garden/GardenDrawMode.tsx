import React, { useEffect, useRef, useState } from "react";
import { Garden } from "../../api/fetchGarden";
import { Stage } from "react-konva";

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
      />
    </div>
  );
};
