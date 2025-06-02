import { useState } from 'react';
import { Link } from 'react-router-dom';

import { GardenMode, GardenVisualization } from '../components/garden/GardenVisualization';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useFloorplanUrl, useGarden } from '../hooks/useGarden';

export const MyGardenPage = () => {
  const { garden, isLoading, isError } = useGarden();
  const { data: floorplanUrl } = useFloorplanUrl(garden?.floorplan_path);

  // Mode state with view as default
  const [mode, setMode] = useState<GardenMode>('view');

  if (isLoading) {
    return <div className="text-center py-8">Loading garden data...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-600">Error loading garden data</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mijn tuin</h1>
        <div className="flex space-x-3">
          {garden && floorplanUrl && (
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setMode('view')}
                className={`px-4 py-2 text-sm font-medium border-y border-l rounded-l-lg ${
                  mode === 'view'
                    ? 'bg-green-100 text-green-700 border-green-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Bekijken
              </button>
              <button
                type="button"
                onClick={() => setMode('edit')}
                className={`px-4 py-2 text-sm font-medium border-y border-l ${
                  mode === 'edit'
                    ? 'bg-green-100 text-green-700 border-green-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Bewerken
              </button>
              <button
                type="button"
                onClick={() => setMode('draw')}
                className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
                  mode === 'draw'
                    ? 'bg-green-100 text-green-700 border-green-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Tekenen
              </button>
            </div>
          )}
          <Link to="/garden/edit">
            <Button>Tuindetails bewerken</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <div className="p-4">
          {garden && floorplanUrl ? (
            <GardenVisualization garden={garden} floorplanUrl={floorplanUrl} mode={mode} />
          ) : (
            <div className="text-gray-500">
              Geen tuingegevens gevonden. Maak een nieuwe tuin aan door op 'Tuindetails bewerken' te klikken.
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
