// filepath: /Users/fvanwijk/projects/tuin-app/src/hooks/usePlantTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasksByPlantId,
  fetchTasksByWeek,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  PlantTaskData,
  getWeekNumber,
  getCurrentYear,
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

// Query hook for fetching tasks for a specific week
export const useWeekTasksQuery = (
  weekNumber: number,
  year: number = getCurrentYear()
) => {
  return useQuery({
    queryKey: ["week-tasks", weekNumber, year],
    queryFn: async () => {
      const result = await fetchTasksByWeek(weekNumber, year);
      return result.data || [];
    },
  });
};

// Query hook for fetching current week's tasks
export const useCurrentWeekTasksQuery = (year: number = getCurrentYear()) => {
  const currentWeek = getWeekNumber(new Date());
  return useWeekTasksQuery(currentWeek, year);
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
      queryClient.invalidateQueries({ queryKey: ["week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["weeks-tasks"] });
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
        queryClient.invalidateQueries({ queryKey: ["week-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["weeks-tasks"] });
      }
    },
  });
};

// Mutation hook for completing task for a specific year
export const useCompleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      plantId,
      completed,
      year = getCurrentYear(),
    }: {
      taskId: string;
      plantId: string;
      completed: boolean;
      year?: number;
    }) => completeTask(taskId, plantId, completed, year),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plant-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["weeks-tasks"] });
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
      queryClient.invalidateQueries({ queryKey: ["week-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["weeks-tasks"] });
    },
  });
};
