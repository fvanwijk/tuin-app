import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase/client";
import { AuthError, AuthResponse, User } from "@supabase/supabase-js";

type AuthMode = "login" | "register";

type AuthCredentials = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Get the page they were trying to access
  const from = location.state?.from?.pathname || "/";

  // Login mutation
  const loginMutation = useMutation<AuthResponse, AuthError, AuthCredentials>({
    mutationFn: (credentials) => supabase.auth.signInWithPassword(credentials),
    onSuccess: (data) => {
      if (data.data.user) {
        setUser(data.data.user);
      }
    },
  });

  // Register mutation
  const registerMutation = useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: async (credentials) => {
      const response = await supabase.auth.signUp(credentials);

      // Check if email is already registered
      if (
        response.data.user &&
        response.data.user.identities &&
        response.data.user.identities.length === 0
      ) {
        throw new Error("This email is already registered.");
      }

      return response;
    },
    onSuccess: () => {
      setMessage(
        "Registration successful! Please check your email to confirm your account."
      );
      // Auto-switch to login mode after registration
      setMode("login");
    },
  });

  // Determine current mutation based on mode
  const currentMutation = mode === "login" ? loginMutation : registerMutation;

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    currentMutation.mutate({ email, password });
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    // Reset any error states and messages when toggling modes
    loginMutation.reset();
    registerMutation.reset();
    setMessage("");
  };

  // Redirect if login was successful
  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === "login" ? "Login to Tuin App" : "Create an Account"}
          </h2>
        </div>
        {currentMutation.isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {currentMutation.error?.message ||
              `Error ${mode === "login" ? "logging in" : "registering"}`}
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={currentMutation.isPending}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={currentMutation.isPending}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={currentMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {currentMutation.isPending
                ? mode === "login"
                  ? "Logging in..."
                  : "Registering..."
                : mode === "login"
                ? "Log in"
                : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={toggleMode}
            className="text-green-600 hover:text-green-500 font-medium"
            disabled={currentMutation.isPending}
          >
            {mode === "login"
              ? "Need an account? Register here"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};
