import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useFirebaseBreakdownData = () => {
  const [breakdownData, setBreakdownData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLLECTION_NAME = "breakdownRecords";

  // Load data from Firestore on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add timeout to detect Firebase connection issues
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Firebase connection timeout")), 5000)
      );

      const firestorePromise = getDocs(
        query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"))
      );

      const querySnapshot = await Promise.race([
        firestorePromise,
        timeoutPromise,
      ]);
      const records = [];

      querySnapshot.forEach((doc) => {
        records.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setBreakdownData(records);
      console.log(`✅ Loaded ${records.length} records from Firebase`);
    } catch (err) {
      console.error("❌ Firebase Error:", err);

      // Provide specific error messages
      let errorMessage = "Failed to connect to Firebase. ";
      if (err.message.includes("timeout")) {
        errorMessage +=
          "Please check your Firebase configuration in src/config/firebase.js";
      } else if (err.code === "permission-denied") {
        errorMessage += "Please check your Firestore security rules.";
      } else if (err.code === "unavailable") {
        errorMessage += "Firebase service is temporarily unavailable.";
      } else {
        errorMessage +=
          "Please check your internet connection and Firebase setup.";
      }

      setError(errorMessage);

      // Fallback to localStorage if Firebase fails
      try {
        const saved = localStorage.getItem("coalMineBreakdownData");
        if (saved) {
          const localData = JSON.parse(saved);
          setBreakdownData(localData);
          console.log(
            `📱 Loaded ${localData.length} records from localStorage (offline mode)`
          );
        }
      } catch (localErr) {
        console.error("Error loading from localStorage:", localErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (record) => {
    try {
      setError(null);

      const recordWithTimestamp = {
        ...record,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, COLLECTION_NAME),
        recordWithTimestamp
      );

      // Add the new record to local state with the generated ID
      const newRecord = {
        id: docRef.id,
        ...recordWithTimestamp,
        timestamp: new Date(), // Use current date for immediate display
      };

      setBreakdownData((prev) => [newRecord, ...prev]);

      // Also save to localStorage as backup
      const updatedData = [newRecord, ...breakdownData];
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(updatedData)
      );
    } catch (err) {
      console.error("Error adding record to Firestore:", err);
      setError("Failed to save record. Please check your internet connection.");

      // Fallback to localStorage
      const newRecord = {
        ...record,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      };
      setBreakdownData((prev) => [newRecord, ...prev]);
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify([newRecord, ...breakdownData])
      );
    }
  };

  const updateRecord = async (id, updatedRecord) => {
    try {
      setError(null);

      const recordRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...updatedRecord,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(recordRef, updateData);

      // Update local state
      setBreakdownData((prev) =>
        prev.map((record) =>
          record.id === id
            ? { ...record, ...updatedRecord, updatedAt: new Date() }
            : record
        )
      );

      // Update localStorage backup
      const updatedData = breakdownData.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      );
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(updatedData)
      );
    } catch (err) {
      console.error("Error updating record in Firestore:", err);
      setError(
        "Failed to update record. Please check your internet connection."
      );

      // Fallback to localStorage
      setBreakdownData((prev) =>
        prev.map((record) =>
          record.id === id ? { ...record, ...updatedRecord } : record
        )
      );
      const updatedData = breakdownData.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      );
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(updatedData)
      );
    }
  };

  const deleteRecord = async (id) => {
    try {
      setError(null);

      await deleteDoc(doc(db, COLLECTION_NAME, id));

      // Update local state
      setBreakdownData((prev) => prev.filter((record) => record.id !== id));

      // Update localStorage backup
      const updatedData = breakdownData.filter((record) => record.id !== id);
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(updatedData)
      );
    } catch (err) {
      console.error("Error deleting record from Firestore:", err);
      setError(
        "Failed to delete record. Please check your internet connection."
      );

      // Fallback to localStorage
      setBreakdownData((prev) => prev.filter((record) => record.id !== id));
      const updatedData = breakdownData.filter((record) => record.id !== id);
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(updatedData)
      );
    }
  };

  const refreshData = () => {
    loadData();
  };

  return {
    breakdownData,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    refreshData,
  };
};
