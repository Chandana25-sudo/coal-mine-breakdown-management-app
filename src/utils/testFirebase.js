import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log("🔥 Testing Firebase connection...");

    // Test reading from Firestore
    const testCollection = collection(db, "breakdownRecords");
    const snapshot = await getDocs(testCollection);

    console.log("✅ Firebase connection successful!");
    console.log(`📊 Found ${snapshot.size} existing records`);

    return {
      success: true,
      message: `Firebase connected successfully. Found ${snapshot.size} records.`,
      recordCount: snapshot.size,
    };
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);

    let errorMessage = "Firebase connection failed: ";

    if (error.code === "permission-denied") {
      errorMessage +=
        "Permission denied. Please check your Firestore security rules.";
    } else if (error.code === "unavailable") {
      errorMessage += "Firebase service is unavailable.";
    } else if (error.message.includes("network")) {
      errorMessage += "Network error. Check your internet connection.";
    } else {
      errorMessage += error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error,
    };
  }
};
