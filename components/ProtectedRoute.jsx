"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ProtectedRoute component to restrict access to authenticated users.
 *
 * This component checks if a user is authenticated and either renders
 * the children components or redirects to the login page.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The components to render if the user is authenticated.
 * @returns {JSX.Element|null} The rendered children or null if not authenticated.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Get user state and loading state from Auth context
  const router = useRouter(); // Router instance for navigation

  useEffect(() => {
    // Redirect to login if user is not authenticated and loading is complete
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Render loading state while checking authentication
  }

  return user ? children : null; // Render children if user is authenticated, else return null
}
