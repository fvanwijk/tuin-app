export const PLANT_TYPE_LABELS: Record<string, string> = {
  heester: "Heester",
  klimmer: "Klimmer",
  vaste_plant: "Vaste plant",
  tweejarige: "Tweejarige",
  eenjarige: "Eenjarige",
  overig: "Overig",
};

export const PLANT_TYPES = Object.keys(PLANT_TYPE_LABELS);

export const getPlantTypeLabel = (type: string | null): string => {
  if (!type) return "Overig";
  return PLANT_TYPE_LABELS[type] || type;
};

/**
 * Groups plants by their type.
 * Always initializes all plant types even if there are no plants of that type.
 * @template T Type of plants
 * @param plants Array of plants with a 'type' property
 * @returns Record with plant types as keys and arrays of plants as values
 */
export function groupPlantsByType<T extends { type?: string | null }>(
  plants: T[] | null | undefined
): Record<string, T[]> {
  // Initialize all predefined plant types
  const groups = PLANT_TYPES.reduce<Record<string, T[]>>((acc, type) => {
    acc[type] = [];
    return acc;
  }, {});

  // Return early if no plants
  if (!plants?.length) return groups;

  // Fill the groups with plants
  return plants.reduce<Record<string, T[]>>((acc, plant) => {
    const type = plant.type || "overig";

    // Make sure the type exists in the accumulator
    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(plant);
    return acc;
  }, groups);
}
