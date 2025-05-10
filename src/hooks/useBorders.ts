import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addBorder,
  updateBorder,
  deleteBorder,
  fetchBorderById,
  fetchBorders,
  BorderData,
} from "../api/fetchBorders";

// Query hook for fetching all borders
export const useBordersQuery = () => {
  return useQuery({
    queryKey: ["borders"],
    queryFn: async () => {
      const { data, error } = await fetchBorders();
      if (error) throw error;
      return data;
    },
  });
};

// Query hook for fetching a single border by ID
export const useBorderByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["border", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await fetchBorderById(id);
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

// Mutation hook for adding a border
export const useAddBorderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (border: BorderData) => addBorder(border),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borders"] });
    },
  });
};

// Mutation hook for updating a border
export const useUpdateBorderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (border: BorderData) => updateBorder(border),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["borders"] });
      queryClient.invalidateQueries({ queryKey: ["border", variables.id] });
      // Also invalidate plants as they may display border information
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};

// Mutation hook for deleting a border
export const useDeleteBorderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBorder(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["borders"] });
      queryClient.invalidateQueries({ queryKey: ["border", id] });
      // Also invalidate plants as they may display border information
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};
