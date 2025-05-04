import { redirect } from "react-router-dom";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "./supabase/client";
import { queryClient } from "./react-query";

export type AuthLoaderData = {
  isAuthenticated: boolean;
};

// Define a unique query key for authentication
const AUTH_QUERY_KEY = ["auth", "user"];

// Function to get the user authentication state
const getUserAuth = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { isAuthenticated: false };
  }
  return { isAuthenticated: true, user: data.user };
};

// Create query options for React Query
const authQueryOptions = queryOptions({
  queryKey: AUTH_QUERY_KEY,
  queryFn: getUserAuth,
  staleTime: 30000, // 30 seconds
});

export async function checkAuth(): Promise<AuthLoaderData> {
  try {
    // Use ensureQueryData to leverage React Query's caching
    const result = await queryClient.ensureQueryData(authQueryOptions);
    return { isAuthenticated: result.isAuthenticated };
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
