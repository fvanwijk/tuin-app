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
        throw new Error('This email is already registered.');
      }

      return response;
    },
    onSuccess: () => {
      setMessage('Registration successful! Please check your email to confirm your account.');
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
        <Card title="Create an Account">
          {registerMutation.isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {registerMutation.error?.message || 'Error during registration'}
            </div>
          )}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              disabled={registerMutation.isPending}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={registerMutation.isPending}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={registerMutation.isPending}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'The passwords do not match',
              })}
            />

            <Button type="submit" fullWidth isLoading={registerMutation.isPending}>
              Register
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
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
