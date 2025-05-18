import { Link } from "react-router-dom";
import { useFloorplanUrl, useGarden } from "../hooks/useGarden";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3-selection";
import { axisTop, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";

export const MyGardenPage = () => {
  const { garden, isLoading, isError } = useGarden();
  const { data: floorplanUrl } = useFloorplanUrl(garden?.floorplan_path);
  const horizontalAxisRef = useRef<SVGGElement>(null);
  const verticalAxisRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const margin = { left: 30, right: 30, top: 30, bottom: 30 };

  const aspectRatio = useMemo(() => {
    if (!garden || !garden.width || !garden.height) {
      return "4/3";
    }
    return `${garden.width}/${garden.height}`;
  }, [garden]);

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
  });

  // Create and update axes when garden data or container width changes
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
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading garden data...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading garden data
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mijn tuin</h1>
        <Link to="/garden/edit">
          <Button>Tuindetails bewerken</Button>
        </Link>
      </div>

      <Card className="mb-8">
        <div className="p-4">
          {garden ? (
            floorplanUrl && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tuinplattegrond</h2>
                <div className="relative" ref={containerRef}>
                  {containerWidth > 0 && (
                    <svg
                      width={containerWidth}
                      height={
                        (containerWidth - margin.left + margin.right) *
                          (garden.height / garden.width) +
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

                  <div className="pl-[30px] pt-[30px] pr-[30px] pb-[30px]">
                    <div className="border overflow-hidden">
                      <img
                        src={floorplanUrl}
                        alt="Tuinplattegrond"
                        className="w-full h-auto object-cover block"
                        style={{
                          aspectRatio,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="text-gray-500">
              Geen tuingegevens gevonden. Maak een nieuwe tuin aan door op
              'Tuindetails bewerken' te klikken.
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
