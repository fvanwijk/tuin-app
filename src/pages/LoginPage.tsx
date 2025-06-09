import { AuthError, AuthResponse, User } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase/client';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Get the page they were trying to access
  const from = location.state?.from?.pathname || '/';

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
        <Card title="Tuin App inloggen">
          {loginMutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {loginMutation.error?.message || 'Fout tijdens het inloggen.'}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="E-mailadres"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              disabled={loginMutation.isPending}
              {...register('email', {
                required: 'E-mail is verplicht',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Verkeerd e-mailadres',
                },
              })}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Vul je wachtwoord in"
              autoComplete="current-password"
              error={errors.password?.message}
              disabled={loginMutation.isPending}
              {...register('password', {
                required: 'Wachtwoord is verplicht',
              })}
            />

            <Button type="submit" fullWidth isLoading={loginMutation.isPending}>
              Log in
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Nog geen account?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-500 font-medium">
                Registreer hier
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
