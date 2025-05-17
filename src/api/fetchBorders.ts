import { supabase } from "../lib/supabase/client";

export type BorderData = {
  id?: string;
  name: string;
};

export async function fetchBorders() {
  return await supabase.from("borders").select().order("name");
}

export async function fetchBorderById(id: string) {
  return await supabase.from("borders").select().eq("id", id).single();
}

export async function addBorder(border: BorderData) {
  return await supabase.from("borders").insert(border).select().single();
}

export async function updateBorder(border: BorderData) {
  if (!border.id) {
    throw new Error("Border ID is required for updates");
  }

  return await supabase
    .from("borders")
    .update({ name: border.name })
    .eq("id", border.id)
    .select()
    .single();
}

export async function deleteBorder(id: string) {
  // First delete the plant-border relationships for this border
  await supabase.from("plants_borders").delete().eq("border_id", id);

  // Then delete the border itself
  return await supabase.from("borders").delete().eq("id", id);
}
