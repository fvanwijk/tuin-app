import { useNavigate } from 'react-router-dom';

import { PlantForm, PlantFormData } from '../components/plants/PlantForm';
import { Card } from '../components/ui/Card';
import { useAddPlantMutation } from '../hooks/usePlants';

export const AddPlantPage = () => {
  const navigate = useNavigate();
  const { mutate: addPlant, isPending: isAdding, error: addError } = useAddPlantMutation();

  const handleSubmit = (data: PlantFormData) => {
    addPlant(data, {
      onSuccess: () => {
        navigate('/plants');
      },
    });
  };

  return (
    <div className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Plant toevoegen</h1>
        <button onClick={() => navigate('/plants')} className="text-green-600 hover:text-green-800">
          Terug naar Mijn Tuin
        </button>
      </div>

      {addError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Er is een fout opgetreden bij het toevoegen van de plant. Probeer het opnieuw.
        </div>
      )}

      <Card>
        <PlantForm initialValues={{ alive: true, name: '' }} onSubmit={handleSubmit} isSubmitting={isAdding} />
      </Card>
    </div>
  );
};
