import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase/client";
import { AuthError, AuthResponse, User } from "@supabase/supabase-js";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Get the page they were trying to access
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // Login mutation
  const loginMutation = useMutation<AuthResponse, AuthError, LoginFormValues>({
    mutationFn: (credentials) => supabase.auth.signInWithPassword(credentials),
    onSuccess: (data) => {
      if (data.data.user) {
        setUser(data.data.user);
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  // Redirect if login was successful
  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card title="Login to Tuin App">
          {loginMutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {loginMutation.error?.message || "Error logging in"}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              disabled={loginMutation.isPending}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              error={errors.password?.message}
              disabled={loginMutation.isPending}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <Button type="submit" fullWidth isLoading={loginMutation.isPending}>
              Log in
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Need an account?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
