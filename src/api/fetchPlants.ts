import { PlantFormData } from '../components/plants/PlantForm';
import { supabase } from '../lib/supabase/client';
import type { Tables } from '../lib/supabase/database.types';

export async function fetchPlants() {
  // Get all plants with their borders
  const { data, error } = await supabase
    .from('plants')
    .select(
      `
      *,
      borders(id, name)
    `,
    )
    .order('name_nl');

  if (error) {
    throw error;
  }

  return { data, error };
}

export type PlantBorder = Pick<Tables<'borders'>, 'id' | 'name'>;

export async function fetchPlantById(id: string) {
  // Fetch a single plant with its borders
  const { data, error } = await supabase
    .from('plants')
    .select(
      `
      *,
      borders(id, name)
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    return { data: null, error };
  }

  // Return the plant with borders as a direct property
  return {
    data,
    error,
  };
}

export async function addPlant(plant: PlantFormData) {
  // Create a copy without borders to use for the plant insert
  const { borders, ...plantData } = plant;

  // Insert the plant
  const { data, error } = await supabase.from('plants').insert(plantData).select().single();

  if (error || !data) {
    throw error || new Error('Failed to add plant');
  }

  // If borders were specified, add them to the junction table
  if (borders && borders.length > 0) {
    const borderRelations = borders.map(({ id }) => ({
      plant_id: data.id,
      border_id: id,
    }));

    const { error: borderError } = await supabase.from('plants_borders').insert(borderRelations);

    if (borderError) {
      throw borderError;
    }
  }

  return { data, error };
}

export async function updatePlant(plant: PlantFormData) {
  if (!plant.id) {
    throw new Error('Plant ID is required for updates');
  }

  // Create a copy without borders to use for the plant update
  const { borders, ...plantData } = plant;

  // Update the plant data

  const { data, error } = await supabase
    .from('plants')
    .update({ ...plantData, type: 'Vaste plant' })
    .eq('id', plant.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Handle borders: delete existing connections and add new ones
  if (borders !== undefined) {
    // Delete existing plant-border relationships
    const { error: deleteError } = await supabase.from('plants_borders').delete().eq('plant_id', plant.id);

    if (deleteError) {
      throw deleteError;
    }

    // Add new plant-border relationships if borders were specified
    if (borders.length > 0) {
      const borderRelations = borders.map(({ id: border_id }) => ({
        plant_id: plant.id as string,
        border_id,
      }));
      const { error: insertError } = await supabase.from('plants_borders').insert(borderRelations);
      if (insertError) {
        throw insertError;
      }
    }
  }

  return { data, error };
}

export async function deletePlant(id: string) {
  // First delete the plant-border relationships
  await supabase.from('plants_borders').delete().eq('plant_id', id);

  // Then delete the plant
  return await supabase.from('plants').delete().eq('id', id);
}
