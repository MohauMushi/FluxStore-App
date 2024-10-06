"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-between bg-gradient-to-br from-teal-200 via-yellow-100 to-teal-200 dark:from-teal-900 dark:via-gray-800 dark:to-teal-900 min-h-[90vh]">
      <div className="flex-grow flex items-center justify-center w-full p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
            <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
              Sign in to continue shopping
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
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
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 dark:from-green-600 dark:to-teal-700 text-white px-4 py-3 rounded-lg hover:from-green-500 hover:to-teal-600 dark:hover:from-green-700 dark:hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm text-center mt-2">
                  {error}
                </div>
              )}
              <div className="text-center text-sm mt-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Don't have an account?
                </span>
                <Link
                  href="/signup"
                  className="text-teal-600 dark:text-teal-400 hover:underline ml-1 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="w-full text-center text-sm text-gray-600 dark:text-gray-400 mb-16 p-4">
        <Link href="/contact" className="hover:underline">
          Contact Us
        </Link>{" "}
        • <span>&#64; {currentYear} FluxStore All Rights Reserved</span>
      </footer>
    </div>
  );
}
