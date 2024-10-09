"use client";

import { useState, useEffect } from "react";
import { firebaseDataManager } from "../utils/firebaseDataManager";

/**
 * Custom hook for managing offline mode and detecting new app versions.
 * @returns {Object} An object containing online status and new version availability.
 * @property {boolean} isOnline - Indicates whether the app is currently online.
 * @property {boolean} newVersionAvailable - Indicates whether a new version of the app is available.
 */
export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(true);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  useEffect(() => {
    /**
     * Handles the online event.
     * Sets the online status to true and syncs any pending changes.
     */
    const handleOnline = () => {
      setIsOnline(true);
      firebaseDataManager.syncPendingChanges();
    };

    /**
     * Handles the offline event.
     * Sets the online status to false.
     */
    const handleOffline = () => setIsOnline(false);

    // Add event listeners for online/offline status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check for service worker updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setNewVersionAvailable(true);
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, newVersionAvailable };
}
