import { Outlet, useLoaderData } from 'react-router-dom';

import { AuthLoaderData } from '../lib/auth';
import { Navigation } from './Navigation';

export const Layout = () => {
  // Access the authentication state from the loader
  const { isAuthenticated, user } = useLoaderData() as AuthLoaderData;

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} user={user} />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};
