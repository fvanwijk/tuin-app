import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import { AuthLoaderData } from "../lib/auth";

export const Layout = () => {
  // Access the authentication state from the loader
  const { isAuthenticated } = useLoaderData() as AuthLoaderData;

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};
