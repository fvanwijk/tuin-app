import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Garden, fetchFloorplanUrl, fetchGarden, updateGarden, uploadFloorplan } from '../api/fetchGarden';
import { useAuth } from '../lib/auth';

export function useGarden() {
  const queryClient = useQueryClient();

  const gardenQuery = useQuery({
    queryKey: ['garden'],
    queryFn: fetchGarden,
  });

  const updateGardenMutation = useMutation({
    mutationFn: updateGarden,
    onSuccess: (data) => {
      queryClient.setQueryData(['garden'], data);
    },
  });

  const { data: auth } = useAuth();
  const userId = auth?.user?.id;

  const uploadFloorplanMutation = useMutation({
    mutationFn: async ({ file, garden }: { file: File; garden: Partial<Garden> }) => {
      if (!userId) {
        throw new Error('User ID is required to upload the floorplan');
      }
      const floorplan_path = await uploadFloorplan(file, userId);
      return updateGarden({ ...garden, floorplan_path });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['garden'], data);
    },
  });

  return {
    garden: gardenQuery.data,
    isLoading: gardenQuery.isLoading,
    isError: gardenQuery.isError,
    updateGarden: updateGardenMutation.mutate,
    isUpdating: updateGardenMutation.isPending,
    uploadFloorplan: uploadFloorplanMutation.mutate,
    isUploading: uploadFloorplanMutation.isPending,
  };
}

export const useFloorplanUrl = (path?: string | null) =>
  useQuery({
    queryKey: ['floorplan_path', path],
    queryFn: async () => fetchFloorplanUrl(path!),
    enabled: !!path,
  });
