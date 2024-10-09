// Utility functions for Firebase data management
export class FirebaseDataManager {
  constructor() {
    this.pendingChanges = [];
  }

  // Save data to local storage
  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }

  // Get data from local storage
  getFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting from local storage:", error);
      return null;
    }
  }

  // Queue changes when offline
  queueChange(change) {
    this.pendingChanges.push(change);
    this.saveToLocalStorage("pendingChanges", this.pendingChanges);
  }

  // Sync pending changes when online
  async syncPendingChanges(firebaseDb) {
    const pendingChanges = this.getFromLocalStorage("pendingChanges") || [];

    for (const change of pendingChanges) {
      try {
        await firebaseDb.ref(change.path).set(change.data);
      } catch (error) {
        console.error("Error syncing change:", error);
      }
    }

    // Clear pending changes after successful sync
    this.pendingChanges = [];
    localStorage.removeItem("pendingChanges");
  }
}

export const firebaseDataManager = new FirebaseDataManager();
