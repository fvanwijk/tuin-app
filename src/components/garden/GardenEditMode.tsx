import React from 'react';
import { ReactZoomPanPinchContentRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { Garden } from '../../api/fetchGarden';

interface GardenEditModeProps {
  floorplanUrl: string;
  garden: Garden;
  aspectRatio: string;
  transformRef: React.RefObject<ReactZoomPanPinchContentRef | null>;
}

export const GardenEditMode: React.FC<GardenEditModeProps> = ({ floorplanUrl, garden, aspectRatio, transformRef }) => {
  return (
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
          width: '100%',
          height: 'auto',
          border: '1px solid #e2e8f0',
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
  );
};
