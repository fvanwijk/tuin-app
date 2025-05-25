import { supabase } from "../lib/supabase/client";
import type { Tables } from "../lib/supabase/database.types";

export type GardenMapPoint = Tables<"garden_map_points">;

export interface GardenMapPointInput {
  garden_id: string;
  x: number;
  y: number;
  radius: number;
  plant_id?: string | null;
  border_id?: string | null;
}

export async function fetchGardenMapPoints(gardenId: string) {
  const { data, error } = await supabase
    .from("garden_map_points")
    .select("*")
    .eq("garden_id", gardenId)
    .order("created_at");

  return { data: data || [], error };
}

export async function fetchGardenMapPointById(id: string) {
  const { data, error } = await supabase
    .from("garden_map_points")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function addGardenMapPoint(point: GardenMapPointInput) {
  const { data, error } = await supabase
    .from("garden_map_points")
    .insert(point)
    .select()
    .single();

  return { data, error };
}

export async function updateGardenMapPoint(
  id: string,
  updates: Partial<GardenMapPointInput>
) {
  const { data, error } = await supabase
    .from("garden_map_points")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deleteGardenMapPoint(id: string) {
  const { error } = await supabase
    .from("garden_map_points")
    .delete()
    .eq("id", id);

  return { error };
}
