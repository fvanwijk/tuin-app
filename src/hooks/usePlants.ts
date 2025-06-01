import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addPlant,
  updatePlant,
  deletePlant,
  fetchPlantById,
  fetchPlants,
} from "../api/fetchPlants";
import { PlantFormData } from "../components/plants/PlantForm";

// Query hook for fetching all plants with their borders
export const usePlantsQuery = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["plants", searchQuery],
    queryFn: async () => {
      const { data, error } = await fetchPlants(searchQuery);
      if (error) throw error;
      return data;
    },
  });
};

// Query hook for fetching a single plant by ID
export const usePlantByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await fetchPlantById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// Mutation hook for adding a plant
export const useAddPlantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plant: PlantFormData) => addPlant(plant),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};

// Mutation hook for updating a plant
export const useUpdatePlantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plant: PlantFormData) => updatePlant(plant),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      queryClient.invalidateQueries({ queryKey: ["plant", variables.id] });
    },
  });
};

// Mutation hook for deleting a plant
export const useDeletePlantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlant(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      queryClient.invalidateQueries({ queryKey: ["plant", id] });
    },
  });
};
