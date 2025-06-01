import { useEffect, useRef, useState } from 'react';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

import { Garden } from '../../api/fetchGarden';
import { useGardenAxes } from '../../hooks/useGardenAxes';
import { GardenEditor } from './GardenEditor';

export type GardenMode = 'view' | 'edit' | 'draw';

interface GardenVisualizationProps {
  garden: Garden;
  floorplanUrl: string;
  mode: GardenMode;
  transformRef: React.RefObject<ReactZoomPanPinchContentRef | null>;
}

export const GardenVisualization: React.FC<GardenVisualizationProps> = ({
  garden,
  floorplanUrl,
  mode,
  transformRef,
}) => {
  const horizontalAxisRef = useRef<SVGGElement>(null);
  const verticalAxisRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const margin = { left: 30, right: 30, top: 30, bottom: 30 };

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useGardenAxes(garden, horizontalAxisRef, verticalAxisRef, containerWidth, margin);

  const getModeDescription = () => {
    if (mode === 'edit') {
      return window.matchMedia('(pointer: coarse)').matches
        ? 'Gebruik twee vingers om in/uit te zoomen en te verplaatsen'
        : 'Gebruik de muis om te slepen en het muiswiel om te zoomen';
    } else if (mode === 'draw') {
      return 'Teken modus - planten toevoegen';
    }
    return '';
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Tuinplattegrond
        {mode !== 'view' && <span className="ml-3 text-sm font-normal text-green-600">{getModeDescription()}</span>}
      </h2>
      <div className="relative" ref={containerRef}>
        {containerWidth > 0 && (
          <svg
            width={containerWidth}
            height={
              (containerWidth - margin.left + margin.right) * (garden.height / garden.width) +
              margin.top +
              margin.bottom
            }
            className="absolute top-0 left-0 pointer-events-none"
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g ref={verticalAxisRef} />
              <g ref={horizontalAxisRef} />
            </g>
          </svg>
        )}

        <div className="p-[30px]">
          <GardenEditor garden={garden} floorplanUrl={floorplanUrl} mode={mode} transformRef={transformRef} />
        </div>
      </div>
    </div>
  );
};
