import { Link } from "react-router-dom";
import { usePlantsQuery } from "../hooks/usePlants";
import { Button } from "../components/ui/Button";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { getPlantTypeLabel } from "../components/plants/utils";
import { colorMap } from "../components/garden/colors";

export const PlantsPage = () => {
  const { data: plants, isLoading, error } = usePlantsQuery();

  const getColors = (colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(",").map((color) => color.trim());
  };

  const groupPlantsByType = () => {
    if (!plants) return {};

    return plants.reduce((groups: Record<string, typeof plants>, plant) => {
      const type = plant.type || "Overig";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(plant);
      return groups;
    }, {});
  };

  const plantsByType = groupPlantsByType();

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mijn tuin</h1>
        <div className="flex gap-4">
          <Link to="/borders">
            <Button variant="secondary">Borders beheren</Button>
          </Link>
          <Link to="/plants/add">
            <Button>Plant toevoegen</Button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Planten laden...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Er is een fout opgetreden bij het ophalen van de planten.
        </div>
      )}

      {plants && plants.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded mb-4 text-center">
          <p className="mb-2 text-lg">Je hebt nog geen planten toegevoegd.</p>
          <p>Klik op 'Plant toevoegen' om je eerste plant toe te voegen.</p>
        </div>
      )}

      {plants && plants.length > 0 && (
        <div className="space-y-6">
          <TabGroup>
            <TabList className="flex p-1 space-x-1 bg-gray-100 rounded-md shadow-inner mb-4">
              {Object.keys(plantsByType).map((type) => (
                <Tab
                  key={type}
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium leading-5 rounded-md focus:outline-none ${
                      selected
                        ? "bg-white shadow text-green-700"
                        : "text-gray-600 hover:bg-white/[0.25] hover:text-green-600"
                    }`
                  }
                >
                  {getPlantTypeLabel(type)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.entries(plantsByType).map(([type, plantsOfType]) => (
                <TabPanel
                  key={type}
                  className="bg-white shadow overflow-hidden sm:rounded-md"
                >
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">
                      {getPlantTypeLabel(type)}
                    </h2>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {plantsOfType.map((plant) => (
                      <li key={plant.id}>
                        <Link
                          to={`/plants/${plant.id}`}
                          className="block hover:bg-gray-50"
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`flex-shrink-0 h-3 w-3 rounded-full ${
                                    plant.alive ? "bg-green-500" : "bg-gray-400"
                                  }`}
                                ></div>
                                <p className="ml-2 text-sm font-medium text-gray-900 truncate">
                                  {plant.name_nl || plant.name}
                                </p>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <div className="flex flex-wrap gap-1">
                                  {plant.borders.map(({ name, id }) => (
                                    <span
                                      key={`${plant.id}-border-${id}`}
                                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                    >
                                      {name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500 italic">
                                  {plant.name}
                                </p>
                              </div>
                              {plant.color && (
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <div className="flex space-x-1">
                                    {getColors(plant.color).map(
                                      (color, index) => (
                                        <span
                                          key={`${plant.id}-${color}-${index}`}
                                          className="h-4 w-4 rounded-full border border-gray-200"
                                          style={{ backgroundColor: color }}
                                          title={colorMap.get(color)}
                                        ></span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      )}
    </div>
  );
};
