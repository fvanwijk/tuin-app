import { scaleLinear } from 'd3-scale';
import { useEffect, useRef, useState } from 'react';

import { Garden } from '../api/fetchGarden';

export interface GardenDimensions {
  width: number;
  height: number;
}

export const useGardenDimensions = (garden: Garden) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<GardenDimensions>({
    width: 0,
    height: 0,
  });

  // Scale function to convert between meters and pixels
  const meterToPixelScale = scaleLinear().domain([0, garden.width]).range([0, dimensions.width]);

  // Update container dimensions when component mounts or resizes
  const updateDimensions = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return {
    containerRef,
    dimensions,
    meterToPixelScale,
    updateDimensions,
  };
};
