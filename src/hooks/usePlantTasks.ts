// filepath: /Users/fvanwijk/projects/tuin-app/src/hooks/usePlantTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasksByPlantId,
  fetchAllTasks,
  fetchCurrentWeekTasks,
  fetchUpcomingTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  PlantTaskData,
} from "../api/fetchPlantTasks";

// Query hook for fetching tasks for a specific plant
export const usePlantTasksQuery = (plantId?: string) => {
  return useQuery({
    queryKey: ["plant-tasks", plantId],
    queryFn: async () => {
      if (!plantId) return [];
      const { data, error } = await fetchTasksByPlantId(plantId);
      if (error) throw error;
      return data;
    },
    enabled: !!plantId,
  });
};

// Query hook for fetching all tasks
export const useAllTasksQuery = () => {
  return useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const { data, error } = await fetchAllTasks();
      if (error) throw error;
      return data;
    },
  });
};

// Query hook for fetching current week's tasks
export const useCurrentWeekTasksQuery = () => {
  return useQuery({
    queryKey: ["current-week-tasks"],
    queryFn: async () => {
      const { data, error } = await fetchCurrentWeekTasks();
      if (error) throw error;
      return data;
    },
  });
};

// Query hook for fetching upcoming tasks
export const useUpcomingTasksQuery = (weeksAhead?: number) => {
  return useQuery({
    queryKey: ["upcoming-tasks", weeksAhead],
    queryFn: async () => {
      const { data, error } = await fetchUpcomingTasks(weeksAhead);
      if (error) throw error;
      return data;
    },
  });
};

// Mutation hook for adding a task
export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: PlantTaskData) => addTask(task),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["plant-tasks", variables.plant_id],
      });
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["current-week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
    },
  });
};

// Mutation hook for updating a task
export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: PlantTaskData) => updateTask(task),
    onSuccess: (_, variables) => {
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: ["plant-tasks", variables.plant_id],
        });
        queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["current-week-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
      }
    },
  });
};

// Mutation hook for toggling task completion
export const useToggleTaskCompletionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleTaskCompletion(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["current-week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
    },
  });
};

// Mutation hook for deleting a task
export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["current-week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
    },
  });
};
