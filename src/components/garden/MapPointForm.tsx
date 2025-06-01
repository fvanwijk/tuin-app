import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { useBordersQuery } from '../../hooks/useBorders';
import { useUpdateGardenMapPointMutation } from '../../hooks/useGardenMapPoints';
import { usePlantsQuery } from '../../hooks/usePlants';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface SelectOption {
  value: string;
  label: string;
}

interface MapPointFormValues {
  x: number;
  y: number;
  radius: number;
  plant_id: string | null;
  border_id: string | null;
}

interface MapPointFormProps {
  selectedPoint: {
    id: string;
    x: number;
    y: number;
    radius: number;
    plant_id?: string | null;
    border_id?: string | null;
    garden_id: string;
  };
}

export const MapPointForm: React.FC<MapPointFormProps> = ({ selectedPoint }) => {
  const { data: plants = [], isLoading: isPlantsLoading } = usePlantsQuery();
  const { data: borders = [], isLoading: isBordersLoading } = useBordersQuery();
  const updateGardenMapPoint = useUpdateGardenMapPointMutation();

  // Plant options for select
  const plantOptions: SelectOption[] = plants.map((plant) => ({
    value: plant.id,
    label: plant.name_nl || plant.name,
  }));

  // Border options for select
  const borderOptions: SelectOption[] = borders.map((border) => ({
    value: border.id,
    label: border.name,
  }));

  // React Hook Form setup
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<MapPointFormValues>({
    defaultValues: {
      x: selectedPoint.x,
      y: selectedPoint.y,
      radius: selectedPoint.radius,
      plant_id: selectedPoint.plant_id || null,
      border_id: selectedPoint.border_id || null,
    },
  });

  // Update form when selected point changes
  useEffect(() => {
    reset({
      x: selectedPoint.x,
      y: selectedPoint.y,
      radius: selectedPoint.radius,
      plant_id: selectedPoint.plant_id || null,
      border_id: selectedPoint.border_id || null,
    });
  }, [selectedPoint, reset]);

  // Watch form values for changes
  const formValues = watch();

  // Save changes when input loses focus
  const saveChanges = () => {
    // Only update if values are different from the selected point
    if (
      selectedPoint.x !== formValues.x ||
      selectedPoint.y !== formValues.y ||
      selectedPoint.radius !== formValues.radius ||
      selectedPoint.plant_id !== formValues.plant_id ||
      selectedPoint.border_id !== formValues.border_id
    ) {
      updateGardenMapPoint.mutate({
        id: selectedPoint.id,
        updates: {
          x: formValues.x,
          y: formValues.y,
          radius: formValues.radius,
          plant_id: formValues.plant_id,
          border_id: formValues.border_id,
        },
      });
    }
  };

  // Handlers for select components
  const handlePlantChange = (selected: SelectOption | null) => {
    setValue('plant_id', selected ? selected.value : null, {
      shouldDirty: true,
    });
    // Save changes immediately when plant selection changes
    setTimeout(() => saveChanges(), 0);
  };

  const handleBorderChange = (selected: SelectOption | null) => {
    setValue('border_id', selected ? selected.value : null, {
      shouldDirty: true,
    });
    // Save changes immediately when border selection changes
    setTimeout(() => saveChanges(), 0);
  };

  // Find current selected plant and border
  const selectedPlantOption = plantOptions.find((option) => option.value === formValues.plant_id) || null;

  const selectedBorderOption = borderOptions.find((option) => option.value === formValues.border_id) || null;

  return (
    <Card className="mt-4">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Punt details</h3>
        <form className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X positie (meters)</label>
            <Input
              type="number"
              step="0.1"
              {...register('x', {
                valueAsNumber: true,
                required: 'X positie is verplicht',
              })}
              onBlur={saveChanges}
              error={errors.x?.message}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y positie (meters)</label>
            <Input
              type="number"
              step="0.1"
              {...register('y', {
                valueAsNumber: true,
                required: 'Y positie is verplicht',
              })}
              onBlur={saveChanges}
              error={errors.y?.message}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Straal (meters)</label>
            <Input
              type="number"
              step="0.1"
              min="0.1"
              {...register('radius', {
                valueAsNumber: true,
                required: 'Straal is verplicht',
                min: {
                  value: 0.1,
                  message: 'Straal moet minimaal 0.1 meter zijn',
                },
              })}
              onBlur={saveChanges}
              error={errors.radius?.message}
              className="w-full"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
            {isPlantsLoading ? (
              <p className="text-gray-500 text-sm">Planten laden...</p>
            ) : (
              <Select
                options={plantOptions}
                value={selectedPlantOption}
                onChange={handlePlantChange}
                placeholder="Selecteer een plant..."
                isClearable
                className="text-sm"
                classNamePrefix="react-select"
              />
            )}
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
            {isBordersLoading ? (
              <p className="text-gray-500 text-sm">Borders laden...</p>
            ) : (
              <Select
                options={borderOptions}
                value={selectedBorderOption}
                onChange={handleBorderChange}
                placeholder="Selecteer een border..."
                isClearable
                className="text-sm"
                classNamePrefix="react-select"
              />
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};
