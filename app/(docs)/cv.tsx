import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const FirestoreTest: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDocRef = doc(db, "users", "knownUserId"); // Replace "knownUserId" with a valid document ID
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log("User Data:", userData); // Log user data for debugging
          setUserName(`${userData.first_name} ${userData.last_name}`);
        } else {
          console.log("No such user document!");
          setUserName("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{userName || "No name available"}</Text>
    </View>
  );
};

export default FirestoreTest;
