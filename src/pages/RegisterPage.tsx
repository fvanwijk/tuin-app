import { AuthResponse } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase/client';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage = () => {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormValues>();

  const password = watch('password');

  // Register mutation
  const registerMutation = useMutation<AuthResponse, Error, Omit<RegisterFormValues, 'confirmPassword'>>({
    mutationFn: async (credentials) => {
      const response = await supabase.auth.signUp(credentials);

      // Check if email is already registered
      if (response.data.user && response.data.user.identities && response.data.user.identities.length === 0) {
        throw new Error('Dit e-mailadres is al geregistreerd.');
      }

      return response;
    },
    onSuccess: () => {
      setMessage('Registratie gelukt! Kijk in je mailbox om je registratie te bevestigen.');
      reset();
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    setMessage('');
    const { email, password } = data;
    registerMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card title="Account aanmaken">
          {registerMutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {registerMutation.error?.message || 'Fout tijdens registratie'}
            </div>
          )}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="E-mailadres"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              disabled={registerMutation.isPending}
              {...register('email', {
                required: 'E-mailadres is verplicht',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Verkeerd e-mailadres',
                },
              })}
            />

            <Input
              id="password"
              type="password"
              label="Wachtwoord"
              placeholder="Vul je wachtwoord in"
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={registerMutation.isPending}
              {...register('password', {
                required: 'Wachtwoord is verplicht',
                minLength: {
                  value: 6,
                  message: 'Wachwoord moet minimaal 6 tekens bevatten',
                },
              })}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Bevestig wachtwoord"
              placeholder="Bevestig je wachtwoord"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={registerMutation.isPending}
              {...register('confirmPassword', {
                required: 'Bevestig je wachtwoord',
                validate: (value) => value === password || 'De wachtwoorden komen niet overeen',
              })}
            />

            <Button type="submit" fullWidth isLoading={registerMutation.isPending}>
              Registreer
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Heb je al een account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
