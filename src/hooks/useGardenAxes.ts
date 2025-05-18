import { useEffect, RefObject } from "react";
import * as d3 from "d3-selection";
import { axisTop, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { Garden } from "../api/fetchGarden";

interface Margin {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Custom hook to draw garden axes based on garden dimensions
 *
 * @param garden The garden data with width and height
 * @param horizontalAxisRef Reference to horizontal axis SVG element
 * @param verticalAxisRef Reference to vertical axis SVG element
 * @param containerWidth Width of the container element
 * @param margin Margin values for positioning
 */
export const useGardenAxes = (
  garden: Garden | null | undefined,
  horizontalAxisRef: RefObject<SVGGElement | null>,
  verticalAxisRef: RefObject<SVGGElement | null>,
  containerWidth: number,
  margin: Margin
) => {
  useEffect(() => {
    if (
      !garden ||
      !horizontalAxisRef.current ||
      !verticalAxisRef.current ||
      !containerWidth
    )
      return;

    const imageWidth = containerWidth - margin.left - margin.right;
    const imageHeight = imageWidth * (garden.height / garden.width);

    d3.select(horizontalAxisRef.current).selectAll("*").remove();
    d3.select(verticalAxisRef.current).selectAll("*").remove();

    const xScale = scaleLinear()
      .domain([0, garden.width])
      .range([0, imageWidth]);

    const yScale = scaleLinear()
      .domain([0, garden.height])
      .range([0, imageHeight]);

    const xAxis = axisTop(xScale)
      .ticks(5)
      .tickFormat((d) => `${d}m`);

    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d}m`);

    d3.select(horizontalAxisRef.current).call(xAxis);
    d3.select(verticalAxisRef.current).call(yAxis);
  }, [garden, horizontalAxisRef, verticalAxisRef, containerWidth, margin]);
};
