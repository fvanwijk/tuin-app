import { useParams, useNavigate } from "react-router-dom";
import { usePlantByIdQuery } from "../hooks/usePlants";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlantTasks } from "../components/plants/PlantTasks";
import { Link } from "react-router-dom";

const PLANT_TYPE_LABELS: Record<string, string> = {
  heester: "Heester",
  klimmer: "Klimmer",
  vaste_plant: "Vaste plant",
  tweejarige: "Tweejarige",
  eenjarige: "Eenjarige",
};

export const PlantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plant, isLoading, error } = usePlantByIdQuery(id);

  const getColors = (colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(",").map((color) => color.trim());
  };

  const getPlantTypeLabel = (type: string | null): string => {
    if (!type) return "Overig";
    return PLANT_TYPE_LABELS[type] || type;
  };

  if (isLoading) {
    return (
      <div className="container p-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Plant laden...</p>
        </div>
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="container p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Deze plant kon niet worden gevonden.
        </div>
        <Button onClick={() => navigate("/plants")}>
          Terug naar Mijn Tuin
        </Button>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{plant.name_nl || plant.name}</h1>
        <button
          onClick={() => navigate("/plants")}
          className="text-green-600 hover:text-green-800"
        >
          Terug naar Mijn Tuin
        </button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Plantinformatie</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-32 font-medium text-gray-700">Status:</div>
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      plant.alive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="ml-2">
                    {plant.alive ? "Levend" : "Niet meer aanwezig"}
                  </span>
                </div>
              </div>
              <div className="flex">
                <div className="w-32 font-medium text-gray-700">
                  Latijnse naam:
                </div>
                <div className="italic">{plant.name}</div>
              </div>
              {plant.name_nl && (
                <div className="flex">
                  <div className="w-32 font-medium text-gray-700">
                    Nederlandse naam:
                  </div>
                  <div>{plant.name_nl}</div>
                </div>
              )}
              <div className="flex">
                <div className="w-32 font-medium text-gray-700">Type:</div>
                <div>{getPlantTypeLabel(plant.type)}</div>
              </div>
              {plant.color && (
                <div className="flex">
                  <div className="w-32 font-medium text-gray-700">Kleuren:</div>
                  <div className="flex space-x-1">
                    {getColors(plant.color).map((color, index) => (
                      <div key={`color-${index}`} className="flex items-center">
                        <span
                          className="h-4 w-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        ></span>
                        <span className="ml-1 text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Borders</h2>
            {plant.borders && plant.borders.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {plant.borders.map((border) => (
                  <span
                    key={border.id}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-800"
                  >
                    {border.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Deze plant is niet aan een border toegewezen
              </p>
            )}

            {plant.comments && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Notities</h2>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {plant.comments}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link to={`/plants/${plant.id}/edit`}>
            <Button>Plant bewerken</Button>
          </Link>
        </div>
      </Card>

      {/* Plant Tasks section */}
      <Card className="mt-6">
        <PlantTasks
          plantId={plant.id}
          plantName={plant.name_nl || plant.name}
        />
      </Card>
    </div>
  );
};
