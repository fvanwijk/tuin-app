import { Link } from "react-router-dom";
import { useFloorplanUrl, useGarden } from "../hooks/useGarden";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3-selection";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { useGardenAxes } from "../hooks/useGardenAxes";

export const MyGardenPage = () => {
  const { garden, isLoading, isError, updateGarden } = useGarden();
  const { data: floorplanUrl } = useFloorplanUrl(garden?.floorplan_path);
  const horizontalAxisRef = useRef<SVGGElement>(null);
  const verticalAxisRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const margin = { left: 30, right: 30, top: 30, bottom: 30 };

  // Edit mode state variable
  const [isEditMode, setIsEditMode] = useState(false);
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

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

  // Use the extracted hook for drawing axes
  useGardenAxes(
    garden,
    horizontalAxisRef,
    verticalAxisRef,
    containerWidth,
    margin
  );

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditMode && garden) {
      // Get the current state from the transform component
      const transformState = transformRef.current?.instance.transformState;

      if (transformState) {
        // Save changes when exiting edit mode
        updateGarden({
          id: garden.id,
          scale: transformState.scale,
          position_x: transformState.positionX,
          position_y: transformState.positionY,
        });
      }
    }
    setIsEditMode(!isEditMode);
  };

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
        <div className="flex space-x-3">
          {garden && floorplanUrl && (
            <Button
              onClick={toggleEditMode}
              variant="secondary"
              className={
                isEditMode ? "bg-green-100 border-green-500 text-green-700" : ""
              }
            >
              {isEditMode ? "Bewerken afsluiten" : "Plattegrond bewerken"}
            </Button>
          )}
          <Link to="/garden/edit">
            <Button>Tuindetails bewerken</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <div className="p-4">
          {garden ? (
            floorplanUrl && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Tuinplattegrond
                  {isEditMode && (
                    <span className="ml-3 text-sm font-normal text-green-600">
                      {window.matchMedia("(pointer: coarse)").matches
                        ? "Gebruik twee vingers om in/uit te zoomen en te verplaatsen"
                        : "Gebruik de muis om te slepen en het muiswiel om te zoomen"}
                    </span>
                  )}
                </h2>
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
                            transform: `translate(${
                              garden.position_x || 0
                            }px, ${garden.position_y || 0}px) scale(${
                              garden.scale || 1
                            })`,
                            transformOrigin: "left top",
                          }}
                        />
                      </div>
                    )}
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
