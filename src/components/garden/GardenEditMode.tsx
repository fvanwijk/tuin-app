import { useEffect, useRef, useState } from 'react';

import { Garden } from '../../api/fetchGarden';
import useImage from 'use-image';
import { Image, Layer, Stage, Transformer } from 'react-konva';
import { useGardenDimensions } from '../../hooks/useGardenDimensions';
import type Konva from 'konva';
import { useGarden } from '../../hooks/useGarden';

interface GardenEditModeProps {
  floorplanUrl: string;
  garden: Garden;
}

export const GardenEditMode = ({ floorplanUrl, garden }: GardenEditModeProps) => {
  const { containerRef, dimensions, meterToPixelScale } = useGardenDimensions(garden);
  const { updateGarden } = useGarden();

  const [t, setT] = useState({ scale: garden.scale, x: garden.position_x, y: garden.position_y });
  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [image] = useImage(floorplanUrl);

  const handleTransform = () => {
    const node = imageRef.current!;
    setT({ scale: node.scaleX(), x: node.x(), y: node.y() });
  };

  const storeTransform = () => {
    const node = imageRef.current!;

    updateGarden({
      id: garden.id,
      scale: node.scaleX(),
      position_x: node.x(),
      position_y: node.y(),
    });
  };

  useEffect(() => {
    if (image && imageRef.current && trRef.current) {
      trRef.current.nodes([imageRef.current]);
    }
  }, [image]);

  return (
    <div className="border overflow-hidden relative" ref={containerRef}>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        scale={{ x: meterToPixelScale(1), y: meterToPixelScale(1) }}
      >
        <Layer>
          {image && (
            <Image
              ref={imageRef}
              image={image}
              width={garden.width}
              height={garden.height}
              scale={{ x: t.scale, y: t.scale }}
              x={t.x}
              y={t.y}
              draggable
              onTransform={handleTransform}
              onTransformEnd={storeTransform}
              onDragEnd={storeTransform}
            />
          )}
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) =>
              Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10 ? oldBox : newBox
            }
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          />
        </Layer>
      </Stage>
    </div>
  );
};
