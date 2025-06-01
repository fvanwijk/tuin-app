import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  GardenMapPointInput,
  addGardenMapPoint,
  deleteGardenMapPoint,
  fetchGardenMapPointById,
  fetchGardenMapPoints,
  updateGardenMapPoint,
} from '../api/fetchGardenMapPoints';

// Query hook for fetching all garden map points for a garden
export const useGardenMapPoints = (gardenId?: string) => {
  return useQuery({
    queryKey: ['gardenMapPoints', gardenId],
    queryFn: async () => {
      if (!gardenId) return [];
      const { data, error } = await fetchGardenMapPoints(gardenId);
      if (error) throw error;
      return data;
    },
    enabled: !!gardenId,
  });
};

// Query hook for fetching a single garden map point by ID
export const useGardenMapPointById = (id?: string) => {
  return useQuery({
    queryKey: ['gardenMapPoint', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await fetchGardenMapPointById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// Mutation hook for adding a garden map point
export const useAddGardenMapPointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (point: GardenMapPointInput) => addGardenMapPoint(point),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['gardenMapPoints', variables.garden_id],
      });
    },
  });
};

// Mutation hook for updating a garden map point
export const useUpdateGardenMapPointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<GardenMapPointInput> }) =>
      updateGardenMapPoint(id, updates),
    onSuccess: (result) => {
      if (result.data) {
        queryClient.invalidateQueries({
          queryKey: ['gardenMapPoints', result.data.garden_id],
        });
        queryClient.invalidateQueries({
          queryKey: ['gardenMapPoint', result.data.id],
        });
      }
    },
  });
};

// Mutation hook for deleting a garden map point
export const useDeleteGardenMapPointMutation = (gardenId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGardenMapPoint(id),
    onSuccess: () => {
      if (gardenId) {
        queryClient.invalidateQueries({
          queryKey: ['gardenMapPoints', gardenId],
        });
      }
    },
  });
};
