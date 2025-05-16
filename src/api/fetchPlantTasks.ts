// filepath: /Users/fvanwijk/projects/tuin-app/src/api/fetchPlantTasks.ts
import { supabase } from "../lib/supabase/client";
import type { Tables } from "../lib/supabase/database.types";

export type PlantTask = Tables<"plant_tasks">;
export type CompletedTask = Tables<"completed_tasks">;

export interface PlantTaskData {
  id?: string;
  plant_id: string;
  title: string;
  description?: string | null;
  week_number?: number | null;
  completed?: boolean;
}

export interface TaskWithPlantDetails {
  id: string;
  plant_id: string;
  title: string;
  description: string | null;
  week_number: number | null;
  completed: boolean;
  created_at: string;
  user_id: string;
  plants: {
    id: string;
    name: string;
    name_nl: string | null;
  };
  isCompletedThisYear?: boolean;
}

// Helper function to get ISO week number
export function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// Get current year
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Fetch tasks by plant ID
export async function fetchTasksByPlantId(plant_id: string) {
  return await supabase
    .from("plant_tasks")
    .select()
    .eq("plant_id", plant_id)
    .order("week_number", { ascending: true })
    .order("created_at", { ascending: false });
}

// Fetch all tasks
export async function fetchAllTasks() {
  return await supabase
    .from("plant_tasks")
    .select(
      `
      *,
      plants (
        id,
        name,
        name_nl
      )
    `
    )
    .order("week_number", { ascending: true })
    .order("created_at", { ascending: false });
}

// Fetch tasks for a specific week
export async function fetchTasksByWeek(weekNumber: number) {
  const { data: tasks, error } = await supabase
    .from("plant_tasks")
    .select(
      `
      *,
      plants (
        id,
        name,
        name_nl
      )
    `
    )
    .eq("week_number", weekNumber)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const currentYear = getCurrentYear();

  // Get completed tasks for this year
  const { data: completedTasks } = await supabase
    .from("completed_tasks")
    .select()
    .eq("year", currentYear)
    .in(
      "task_id",
      tasks.map((task) => task.id)
    );

  // Mark tasks that are completed for this year
  const tasksWithCompletionStatus = tasks.map((task) => {
    const isCompleted = completedTasks?.some(
      (completed) => completed.task_id === task.id
    );
    return {
      ...task,
      isCompletedThisYear: !!isCompleted,
    };
  });

  return { data: tasksWithCompletionStatus, error: null };
}

// Fetch tasks for multiple weeks
export async function fetchTasksForWeeks(startWeek: number, endWeek: number) {
  const { data: tasks, error } = await supabase
    .from("plant_tasks")
    .select(
      `
      *,
      plants (
        id,
        name,
        name_nl
      )
    `
    )
    .gte("week_number", startWeek)
    .lte("week_number", endWeek)
    .order("week_number", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const currentYear = getCurrentYear();

  // Get completed tasks for this year
  const { data: completedTasks } = await supabase
    .from("completed_tasks")
    .select()
    .eq("year", currentYear)
    .in(
      "task_id",
      tasks.map((task) => task.id)
    );

  // Mark tasks that are completed for this year
  const tasksWithCompletionStatus = tasks.map((task) => {
    const isCompleted = completedTasks?.some(
      (completed) => completed.task_id === task.id
    );
    return {
      ...task,
      isCompletedThisYear: !!isCompleted,
    };
  });

  return { data: tasksWithCompletionStatus, error: null };
}

// Get task by ID
export async function fetchTaskById(id: string) {
  return await supabase
    .from("plant_tasks")
    .select(
      `
      *,
      plants (
        id,
        name,
        name_nl
      )
    `
    )
    .eq("id", id)
    .single();
}

// Add a task
export async function addTask(task: PlantTaskData) {
  return await supabase
    .from("plant_tasks")
    .insert({ ...task, completed: task.completed || false })
    .select()
    .single();
}

// Update a task
export async function updateTask(task: PlantTaskData) {
  if (!task.id) {
    throw new Error("Task ID is required for updates");
  }

  return await supabase
    .from("plant_tasks")
    .update(task)
    .eq("id", task.id)
    .select()
    .single();
}

// Mark a task as completed for the current year
export async function completeTask(
  taskId: string,
  plantId: string,
  completed: boolean
) {
  const currentYear = getCurrentYear();

  if (completed) {
    // Add to completed_tasks
    return await supabase
      .from("completed_tasks")
      .insert({
        task_id: taskId,
        plant_id: plantId,
        year: currentYear,
      })
      .select()
      .single();
  } else {
    // Remove from completed_tasks
    return await supabase
      .from("completed_tasks")
      .delete()
      .eq("task_id", taskId)
      .eq("year", currentYear);
  }
}

// Get current week's tasks
export async function fetchCurrentWeekTasks() {
  const today = new Date();
  const currentWeek = getWeekNumber(today);

  return await fetchTasksByWeek(currentWeek);
}

// Delete a task
export async function deleteTask(id: string) {
  // First delete any completed records for this task
  await supabase.from("completed_tasks").delete().eq("task_id", id);

  // Then delete the task itself
  return await supabase.from("plant_tasks").delete().eq("id", id);
}
