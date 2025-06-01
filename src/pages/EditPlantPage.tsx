import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { PlantForm, PlantFormData } from '../components/plants/PlantForm';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useDeletePlantMutation, usePlantByIdQuery, useUpdatePlantMutation } from '../hooks/usePlants';

export const EditPlantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: updatePlant, isPending: isUpdating, error: updateError } = useUpdatePlantMutation();
  const { mutate: deletePlant, isPending: isDeleting } = useDeletePlantMutation();
  const { data: plant, isLoading, error } = usePlantByIdQuery(id);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSubmit = (data: PlantFormData) => {
    updatePlant(
      { ...data, id },
      {
        onSuccess: () => {
          navigate(`/plants/${id}`);
        },
      },
    );
  };

  const handleDelete = () => {
    if (id) {
      deletePlant(id, {
        onSuccess: () => {
          navigate('/plants');
        },
      });
    }
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
        <Button onClick={() => navigate('/plants')}>Terug naar Mijn Tuin</Button>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Plant bewerken</h1>
        <div className="flex space-x-4">
          <Link to={`/plants/${id}`} className="text-green-600 hover:text-green-800">
            Terug naar plantdetails
          </Link>
          <Link to="/plants" className="text-green-600 hover:text-green-800">
            Terug naar Mijn Tuin
          </Link>
        </div>
      </div>

      {updateError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Er is een fout opgetreden bij het bijwerken van de plant. Probeer het opnieuw.
        </div>
      )}

      <Card>
        <PlantForm
          initialValues={{
            alive: plant.alive || false,
            borders: plant.borders || [],
            color: plant.color,
            comments: plant.comments,
            id: plant.id,
            name_nl: plant.name_nl || '',
            name: plant.name,
            type: plant.type,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />

        <div className="mt-6 pt-6 border-t border-gray-200">
          {!showConfirmDelete ? (
            <Button
              variant="secondary"
              onClick={() => setShowConfirmDelete(true)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Plant verwijderen
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-600 font-medium">Weet je zeker dat je deze plant wilt verwijderen?</p>
              <div className="flex space-x-4">
                <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
                  Annuleren
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDelete}
                  isLoading={isDeleting}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Verwijderen bevestigen
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
