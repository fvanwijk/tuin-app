import { supabase } from "../lib/supabase/client";

export interface Garden {
  created_at: string;
  floorplan_path: string | null;
  height: number;
  id: string;
  position_x: number;
  position_y: number;
  scale: number;
  user_id: string;
  width: number;
}

export async function fetchGarden() {
  const { data, error } = await supabase.from("garden").select("*").single();

  if (error) {
    console.error("Error fetching garden:", error);
    return null;
  }

  return data;
}

export async function updateGarden(garden: Partial<Garden>) {
  const { data, error } = await supabase
    .from("garden")
    .upsert(garden)
    .select()
    .single();

  if (error) {
    console.error("Error updating garden:", error);
    throw error;
  }

  return data as Garden;
}

export async function uploadFloorplan(file: File, userId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `floorplan.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("gardens")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Error uploading floorplan:", uploadError);
    throw uploadError;
  }

  return filePath;
}

export async function fetchFloorplanUrl(path: string) {
  const { data, error } = await supabase.storage
    .from("gardens")
    .createSignedUrl(path, 60);

  if (error) {
    console.error("Error fetching floorplan URL:", error);
    return null;
  }

  return data.signedUrl;
}
