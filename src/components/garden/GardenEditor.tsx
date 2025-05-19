import { useMemo } from "react";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { Garden } from "../../api/fetchGarden";

interface GardenEditorProps {
  floorplanUrl: string;
  garden: Garden;
  isEditMode: boolean;
  transformRef: React.RefObject<ReactZoomPanPinchContentRef | null>;
}

export const GardenEditor: React.FC<GardenEditorProps> = ({
  floorplanUrl,
  garden,
  isEditMode,
  transformRef,
}) => {
  const aspectRatio = useMemo(() => {
    if (!garden || !garden.width || !garden.height) {
      return "4/3";
    }
    return `${garden.width}/${garden.height}`;
  }, [garden]);

  return (
    <>
      {isEditMode ? (
        <TransformWrapper
          ref={transformRef}
          initialScale={garden.scale || 1}
          initialPositionX={garden.position_x || 0}
          initialPositionY={garden.position_y || 0}
          minScale={0.1}
          maxScale={5}
          limitToBounds={false}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "auto",
              border: "1px solid #e2e8f0",
            }}
          >
            <img
              className="w-full h-auto object-contain"
              src={floorplanUrl}
              alt="Tuinplattegrond"
              style={{
                aspectRatio,
              }}
              draggable={false}
            />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <div className="border overflow-hidden">
          <img
            src={floorplanUrl}
            alt="Tuinplattegrond"
            className="w-full h-auto object-contain block opacity-50"
            style={{
              aspectRatio,
              transform: `translate(${garden.position_x || 0}px, ${
                garden.position_y || 0
              }px) scale(${garden.scale || 1})`,
              transformOrigin: "left top",
            }}
          />
        </div>
      )}
    </>
  );
};
