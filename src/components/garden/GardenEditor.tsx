import { useMemo } from "react";
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { Garden } from "../../api/fetchGarden";
import { GardenMode } from "./GardenVisualization";
import { GardenViewMode } from "./GardenViewMode";
import { GardenEditMode } from "./GardenEditMode";
import { GardenDrawMode } from "./GardenDrawMode";

interface GardenEditorProps {
  floorplanUrl: string;
  garden: Garden;
  mode: GardenMode;
  transformRef: React.RefObject<ReactZoomPanPinchContentRef | null>;
}

export const GardenEditor: React.FC<GardenEditorProps> = ({
  floorplanUrl,
  garden,
  mode,
  transformRef,
}) => {
  const aspectRatio = useMemo(() => {
    if (!garden || !garden.width || !garden.height) {
      return "4/3";
    }
    return `${garden.width}/${garden.height}`;
  }, [garden]);

  if (mode === "view") {
    return (
      <GardenViewMode
        floorplanUrl={floorplanUrl}
        garden={garden}
        aspectRatio={aspectRatio}
      />
    );
  }

  if (mode === "edit") {
    return (
      <GardenEditMode
        floorplanUrl={floorplanUrl}
        garden={garden}
        aspectRatio={aspectRatio}
        transformRef={transformRef}
      />
    );
  }

  // Draw mode is the default fallback
  return (
    <GardenDrawMode
      floorplanUrl={floorplanUrl}
      garden={garden}
      aspectRatio={aspectRatio}
    />
  );
};
