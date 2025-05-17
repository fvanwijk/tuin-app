import { Link } from "react-router-dom";
import { useFloorplanUrl, useGarden } from "../hooks/useGarden";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useMemo } from "react";

export const MyGardenPage = () => {
  const { garden, isLoading, isError } = useGarden();
  const { data: floorplanUrl } = useFloorplanUrl(garden?.floorplan_path);

  const aspectRatio = useMemo(() => {
    if (!garden || !garden.width || !garden.height) {
      return "4/3";
    }

    return `${garden.width}/${garden.height}`;
  }, [garden]);

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
          <h2 className="text-xl font-semibold mb-4">Tuininformatie</h2>
          {garden ? (
            <div>
              <div className="mb-2">
                <span className="font-medium">Afmetingen:</span> {garden.width}{" "}
                × {garden.height} meter
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              Geen tuingegevens gevonden. Maak een nieuwe tuin aan door op
              'Tuindetails bewerken' te klikken.
            </div>
          )}
        </div>
      </Card>

      {floorplanUrl && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Tuinplattegrond</h2>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={floorplanUrl}
              alt="Tuinplattegrond"
              className="w-full h-auto object-contain block"
              style={{
                aspectRatio,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
