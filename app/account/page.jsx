"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { updatePassword } from "firebase/auth";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * AccountPage component handles user account settings, allowing users to view their account info and update their password.
 * It redirects users to the login page if they are not authenticated.
 *
 * @component
 * @returns {JSX.Element|null} The AccountPage component.
 */
export default function AccountPage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * useEffect hook that redirects the user to the login page if they are not authenticated.
   */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  /**
   * Handles password update form submission. Checks if the passwords match and attempts to update the user's password using Firebase.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if the new password matches the confirmation password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await updatePassword(user, password); // Update the password in Firebase
      setSuccess("Password updated successfully.");
    } catch (error) {
      setError("Error updating password: " + error.message);
    }
  };

  /**
   * Toggles the visibility of the password input fields.
   */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Display a loading spinner while the authentication state is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Return null if no user is logged in (redirect handled by useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Account Settings
            </h1>

            <div className="mt-6">
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account created
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.metadata.creationTime).toLocaleDateString()}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Last sign in
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
                </dd>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Update Password
                  </h3>
                </div>
                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                        className="mr-2"
                      />
                      <label
                        htmlFor="showPassword"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && (
                      <p className="text-green-500 text-sm">{success}</p>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Update Password
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Account Actions
                  </h3>
                  <button
                    onClick={logOut}
                    className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
