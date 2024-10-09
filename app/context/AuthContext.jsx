"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

// Create an Auth context to provide authentication state and functions
const AuthContext = createContext({});

/**
 * AuthProvider component to manage user authentication state and actions.
 *
 * This component uses Firebase's authentication methods to manage user state.
 * It listens for authentication state changes and provides functions for
 * signing up, signing in, and signing out.
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The child components that will have access to the Auth context.
 * @returns {JSX.Element} The AuthProvider component rendering its children.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Holds the current user object
  const [loading, setLoading] = useState(true); // Indicates loading state

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state
      setLoading(false); // Set loading to false once state is determined
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, []);

  /**
   * Signs up a new user with email and password.
   *
   * @async
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @throws {Error} Throws an error if sign-up fails.
   */
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error; // Propagate the error for handling by the caller
    }
  };

  /**
   * Signs in an existing user with email and password.
   *
   * @async
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @throws {Error} Throws an error if sign-in fails.
   */
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error; // Propagate the error for handling by the caller
    }
  };

  /**
   * Logs out the current user.
   *
   * @async
   * @throws {Error} Throws an error if sign-out fails.
   */
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error; // Propagate the error for handling by the caller
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logOut }}>
      {children} {/* Render children with access to Auth context */}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context.
 *
 * @returns {Object} The authentication context value, including user, loading state, signUp, signIn, and logOut functions.
 */
export const useAuth = () => useContext(AuthContext);
