import { Link } from "react-router-dom";
import { useFloorplanUrl, useGarden } from "../hooks/useGarden";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useRef, useState } from "react";
import { GardenVisualization } from "../components/garden/GardenVisualization";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

export const MyGardenPage = () => {
  const { garden, isLoading, isError, updateGarden } = useGarden();
  const { data: floorplanUrl } = useFloorplanUrl(garden?.floorplan_path);

  // Edit mode state variable
  const [isEditMode, setIsEditMode] = useState(false);
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditMode && garden) {
      const transformState = transformRef.current?.instance.transformState;

      if (transformState) {
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
          {garden && floorplanUrl ? (
            <GardenVisualization
              garden={garden}
              floorplanUrl={floorplanUrl}
              isEditMode={isEditMode}
              transformRef={transformRef}
            />
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
