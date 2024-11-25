import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import UserCard from "@/components/UserCard";
import { useUser } from "@clerk/clerk-expo";

interface User {
  id: string;
  name: string;
  profession: string;
  qualification: string;
  location: string;
  profileImageUrl?: string;
}

const MainComponent = () => {
  const { user } = useUser();
  const currentUserRole = user?.publicMetadata?.role;
  const currentUserId = user?.id;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const applicationsRef = collection(db, "applications");
        const applicationsSnapshot = await getDocs(applicationsRef);

        const userIds = applicationsSnapshot.docs.map(
          (doc) => doc.data().userId
        );

        if (userIds.length === 0) {
          setUsers([]);
          setLoading(false);
          return;
        }

        const userPromises = userIds.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as User;
            return {
              id: userDocSnap.id,
              name: `${userData.first_name} ${userData.last_name}`,
              profession: userData.profession,
              qualification: userData.qualification,
              location: userData.location,
              profileImageUrl: userData.profileImageUrl,
            };
          }
          return null;
        });

        const usersData = (await Promise.all(userPromises)).filter(
          (user) => user !== null
        ) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mt-12">
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <UserCard
            users={users}
            onPress={(user) => console.log("User selected:", user)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainComponent;
