import { supabase } from "../lib/supabase/client";

export async function fetchPlants() {
  return await supabase.from("plants").select();
}
