import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Link, useSearchParams } from 'react-router-dom';

import { colorMap } from '../components/garden/colors';
import { PLANT_TYPES, getPlantTypeLabel, groupPlantsByType } from '../components/plants/utils';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tag } from '../components/ui/Tag';
import { usePlantsQuery } from '../hooks/usePlants';

export const PlantsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get query parameters or use defaults
  const searchQuery = searchParams.get('q') || '';
  const selectedTab = searchParams.get('type') || 'heester';

  // Update search query and URL parameter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    // Update URL with the new search query
    const newParams = new URLSearchParams(searchParams);
    if (newQuery) {
      newParams.set('q', newQuery);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  // Handle tab change and update URL
  const handleTabChange = (index: number) => {
    const tabKey = PLANT_TYPES[index];
    // Update URL with the new tab type
    const newParams = new URLSearchParams(searchParams);
    newParams.set('type', tabKey);
    setSearchParams(newParams);
  };

  // Find the selected tab index
  const selectedTabIndex = PLANT_TYPES.indexOf(selectedTab) !== -1 ? PLANT_TYPES.indexOf(selectedTab) : 0;

  const { data: allPlants, isLoading, error } = usePlantsQuery();

  const getColors = (colorString: string | null): string[] => {
    if (!colorString) return [];
    return colorString.split(',').map((color) => color.trim());
  };

  // Client-side filtering function
  const filterPlants = (plants: any[] | null | undefined) => {
    if (!plants) return [];

    return plants.filter((plant) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase().trim();

      // Search in plant names (Dutch and Latin)
      if (plant.name_nl?.toLowerCase().includes(query) || plant.name?.toLowerCase().includes(query)) {
        return true;
      }

      // Search in border names
      if (
        plant.borders &&
        plant.borders.some((border: { name: string }) => border.name.toLowerCase().includes(query))
      ) {
        return true;
      }

      // Search in color names
      if (plant.color) {
        const plantColors = getColors(plant.color);
        if (
          plantColors.some((color) => {
            const colorName = colorMap.get(color)?.toLowerCase();
            return colorName && colorName.includes(query);
          })
        ) {
          return true;
        }
      }

      return false;
    });
  };

  // Apply the filter to the plants
  const plants = filterPlants(allPlants);

  const plantsByType = groupPlantsByType(plants);

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

      <div className="mb-3">
        <Input
          type="text"
          placeholder="Zoeken op naam, latijnse naam, border of kleur (zoals 'Blauw', 'Rood')..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display total number of filtered plants */}
      {plants && !isLoading && (
        <div className="mb-6">
          <p className={`text-sm ${searchQuery ? 'font-medium' : 'text-gray-600'}`}>
            {plants.length === 0
              ? 'Geen planten gevonden'
              : `${plants.length} ${
                  plants.length === 1 ? 'plant' : 'planten'
                } gevonden${searchQuery ? ` voor "${searchQuery}"` : ''}`}
            {searchQuery && allPlants && plants.length !== allPlants.length ? ` (van ${allPlants.length} totaal)` : ''}
          </p>
        </div>
      )}

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

      {plants?.length === 0 && !searchQuery && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded mb-4 text-center">
          <p className="mb-2 text-lg">Je hebt nog geen planten toegevoegd.</p>
          <p>Klik op 'Plant toevoegen' om je eerste plant toe te voegen.</p>
        </div>
      )}

      {/* Always show the tabs regardless of whether there are plants or not */}
      <div className="space-y-6">
        <TabGroup selectedIndex={selectedTabIndex} onChange={handleTabChange}>
          <TabList className="flex p-1 space-x-1 bg-gray-100 rounded-md shadow-inner mb-4">
            {Object.keys(plantsByType).map((type) => (
              <Tab
                key={type}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm font-medium leading-5 rounded-md focus:outline-none ${
                    selected
                      ? 'bg-white shadow text-green-700'
                      : 'text-gray-600 hover:bg-white/[0.25] hover:text-green-600'
                  }`
                }
              >
                <div className="flex items-center justify-center">
                  <span>{getPlantTypeLabel(type)}</span>
                  <Tag variant={plantsByType[type].length > 0 ? 'success' : 'gray'} size="sm" count>
                    {plantsByType[type].length}
                  </Tag>
                </div>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {Object.entries(plantsByType).map(([type, plantsOfType]) => (
              <TabPanel key={type} className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">{getPlantTypeLabel(type)}</h2>
                </div>
                {plantsOfType.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">Geen planten van dit type gevonden.</p>
                    <Link
                      to="/plants/add"
                      className="mt-3 inline-block text-green-600 hover:text-green-700 font-medium"
                    >
                      Plant toevoegen
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {plantsOfType.map((plant) => (
                      <li key={plant.id}>
                        <Link to={`/plants/${plant.id}`} className="block hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`flex-shrink-0 h-3 w-3 rounded-full ${
                                    plant.alive ? 'bg-green-500' : 'bg-gray-400'
                                  }`}
                                ></div>
                                <p className="ml-2 text-sm font-medium text-gray-900 truncate">
                                  {plant.name_nl || plant.name}
                                </p>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <div className="flex flex-wrap gap-1">
                                  {plant.borders &&
                                    plant.borders.map((border: { name: string; id: string }) => (
                                      <Tag key={`${plant.id}-border-${border.id}`} variant="success" size="md">
                                        {border.name}
                                      </Tag>
                                    ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500 italic">{plant.name}</p>
                              </div>
                              {plant.color && (
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <div className="flex space-x-1">
                                    {getColors(plant.color).map((color, index) => (
                                      <span
                                        key={`${plant.id}-${color}-${index}`}
                                        className="h-4 w-4 rounded-full border border-gray-200"
                                        style={{ backgroundColor: color }}
                                        title={colorMap.get(color)}
                                      ></span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};
