// filepath: /Users/fvanwijk/projects/tuin-app/src/api/fetchPlantTasks.ts
import { supabase } from "../lib/supabase/client";
import type { Tables } from "../lib/supabase/database.types";

export type PlantTask = Tables<"plant_tasks">;

export interface PlantTaskData {
  id?: string;
  plant_id: string;
  title: string;
  description?: string | null;
  week_number?: number | null;
  completed?: boolean;
}

export async function fetchTasksByPlantId(plant_id: string) {
  return await supabase
    .from("plant_tasks")
    .select()
    .eq("plant_id", plant_id)
    .order("week_number", { ascending: true })
    .order("created_at", { ascending: false });
}

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

export async function addTask(task: PlantTaskData) {
  return await supabase
    .from("plant_tasks")
    .insert({ ...task, completed: task.completed || false })
    .select()
    .single();
}

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

export async function toggleTaskCompletion(id: string, completed: boolean) {
  return await supabase
    .from("plant_tasks")
    .update({ completed })
    .eq("id", id)
    .select()
    .single();
}

export async function deleteTask(id: string) {
  return await supabase.from("plant_tasks").delete().eq("id", id);
}

// Get current week's tasks
export async function fetchCurrentWeekTasks() {
  const today = new Date();
  const currentWeek = getWeekNumber(today);

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
    .eq("week_number", currentWeek)
    .eq("completed", false)
    .order("created_at", { ascending: false });
}

// Get upcoming tasks for the next X weeks
export async function fetchUpcomingTasks(weeksAhead: number = 4) {
  const today = new Date();
  const currentWeek = getWeekNumber(today);
  const endWeek = Math.min(currentWeek + weeksAhead, 52); // Max 52 weeks in a year

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
    .gte("week_number", currentWeek)
    .lte("week_number", endWeek)
    .eq("completed", false)
    .order("week_number", { ascending: true });
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
