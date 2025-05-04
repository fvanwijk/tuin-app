import { redirect } from "react-router-dom";
import { supabase } from "./supabase/client";

export type AuthLoaderData = {
  isAuthenticated: boolean;
};

export async function checkAuth(): Promise<AuthLoaderData> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return { isAuthenticated: false };
    }
    return { isAuthenticated: true };
  } catch {
    return { isAuthenticated: false };
  }
}

export async function protectedLoader() {
  const { isAuthenticated } = await checkAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return redirect("/login");
  }

  return { isAuthenticated };
}

export async function publicLoader() {
  const { isAuthenticated } = await checkAuth();
  return { isAuthenticated };
}
