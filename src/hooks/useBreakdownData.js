import { useState, useEffect } from "react";

export const useBreakdownData = () => {
  const [breakdownData, setBreakdownData] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("coalMineBreakdownData");
      if (saved) {
        setBreakdownData(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setBreakdownData([]);
    }
  }, []);

  // Save data to localStorage whenever breakdownData changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "coalMineBreakdownData",
        JSON.stringify(breakdownData)
      );
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [breakdownData]);

  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setBreakdownData((prev) => [...prev, newRecord]);
  };

  const updateRecord = (id, updatedRecord) => {
    setBreakdownData((prev) =>
      prev.map((record) =>
        record.id === id
          ? { ...updatedRecord, id, timestamp: record.timestamp }
          : record
      )
    );
  };

  const deleteRecord = (id) => {
    setBreakdownData((prev) => prev.filter((record) => record.id !== id));
  };

  return {
    breakdownData,
    addRecord,
    updateRecord,
    deleteRecord,
  };
};
