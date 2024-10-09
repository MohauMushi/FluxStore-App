"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { Suspense } from "react";
import { useAuth } from "../app/context/AuthContext";
import { Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const UserMenu = () => (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={toggleUserMenu}
        className="flex items-center space-x-1 p-2 rounded-lg text-white hover:bg-teal-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user.email}
                </div>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </Link>
                <button
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-teal-700 shadow-md sticky z-50 top-0" ref={navbarRef}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className={`flex items-center ${isSearchVisible ? "hidden sm:flex" : "flex"}`}
          >
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/accusoft-svgrepo-com.svg"
                className="h-8"
                alt="FluxStore Logo"
                width={45}
                height={50}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                FluxStore
              </span>
            </Link>
          </div>

          <div className="flex flex-grow space-x-4 items-center justify-end">
            <div
              className={`flex-grow max-w-md ${isSearchVisible ? "w-full" : "w-auto"}`}
            >
              <Suspense>
                <SearchBar
                  isVisible={isSearchVisible}
                  onToggle={toggleSearch}
                />
              </Suspense>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-white hover:bg-teal-600 hover:text-white px-3 py-1 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-white hover:bg-teal-600 hover:text-white px-3 py-1 rounded-md text-base font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:bg-teal-600 hover:text-white px-3 py-1 rounded-md text-base font-medium"
                >
                  Contact
                </Link>
                <Link
                  href="/cart"
                  className="p-2 rounded-lg text-white hover:bg-teal-600 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <UserMenu />
              </div>
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-white hover:bg-teal-600 hover:text-white block px-3 py-1 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:bg-teal-600 hover:text-white block px-3 py-1 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white hover:bg-teal-600 hover:text-white block px-3 py-1 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link
                href="/cart"
                className="p-2 rounded-lg text-white hover:bg-teal-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <div className="ml-auto">
                {user ? (
                  <div className="space-y-1">
                    <p className="text-white text-sm">{user.email}</p>
                    <button
                      onClick={logOut}
                      className="text-white hover:bg-teal-600 block px-3 py-1 rounded-md text-base font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account
                    </Link>
                    <Link
                      href="/login"
                      className="text-white hover:bg-teal-600 block px-3 py-1 rounded-md text-base font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-white hover:bg-teal-600 block px-3 py-1 rounded-md text-base font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
