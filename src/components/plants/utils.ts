export const PLANT_TYPE_LABELS: Record<string, string> = {
  heester: "Heester",
  klimmer: "Klimmer",
  vaste_plant: "Vaste plant",
  tweejarige: "Tweejarige",
  eenjarige: "Eenjarige",
};

export const getPlantTypeLabel = (type: string | null): string => {
  if (!type) return "Overig";
  return PLANT_TYPE_LABELS[type] || type;
};
