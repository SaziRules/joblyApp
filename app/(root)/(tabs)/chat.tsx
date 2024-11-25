import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { images } from "@/constants";
import InboxList from "@/components/InboxList";
import UserCard from "@/components/UserCard"; // Ensure this component is properly imported
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router"; // Import useRouter hook

interface User {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

interface UserCardProps {
  users: {
    id: string;
    name: string;
    profession: string;
    qualification: string;
    location: string;
    profileImageUrl?: string;
  }[];
  onPress: (user: UserCardProps["users"][0]) => void;
}

const Chat = () => {
  const [inboxData, setInboxData] = useState<User[]>([]);
  const [jobSeekers, setJobSeekers] = useState<UserCardProps["users"]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobSeekers, setShowJobSeekers] = useState(false);
  const { user } = useUser();
  const currentUserRole = user?.publicMetadata?.role;
  const currentUserId = user?.id;
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    const fetchInboxData = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map((doc) => doc.data() as User);

        // Filter users based on role
        const filteredUsers = users.filter((user) => {
          if (currentUserRole === "Job-Seeker" && user.role === "Employer") {
            return true;
          }
          if (currentUserRole === "Employer" && user.role === "Job-Seeker") {
            return true;
          }
          return false;
        });

        setInboxData(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInboxData();
  }, [currentUserRole]);

  const fetchJobSeekers = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "users");
      const q = query(colRef, where("role", "==", "Job-Seeker"));
      const querySnapshot = await getDocs(q);

      const jobSeekersList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: `${data.first_name} ${data.last_name}`,
          profession: data.profession,
          qualification: data.qualification,
          location: data.location,
          profileImageUrl: data.profileImageUrl,
        };
      });

      setJobSeekers(jobSeekersList);
      setShowJobSeekers(true);
    } catch (error) {
      console.error("Error fetching job seekers:", error);
    } finally {
      setLoading(false);
    }
  };

  const createChatWithUser = async (user: UserCardProps["users"][0]) => {
    if (!currentUserId) return;

    try {
      // Create a new chat document in Firestore
      const chatRef = await addDoc(collection(db, "chats"), {
        members: [currentUserId, user.id],
        createdAt: serverTimestamp(),
      });

      // Navigate to the new chat
      router.replace({
        pathname: "/(chat)/mainchat",
        params: { chatId: chatRef.id },
      });
    } catch (error) {
      console.error("Error creating chat: ", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute top-0 w-full h-[250px] z-0">
        <Image
          source={images.signUpCar}
          style={{ width: "100%", height: "100%" }}
        />
        <View className="absolute bottom-5 left-7 right-5 flex-row items-center justify-between">
          <Text className="text-3xl text-black font-JakartaSemiBold">
            My Chats
          </Text>
          {currentUserRole !== "Job-Seeker" && (
            <TouchableOpacity
              className="bg-white p-2 rounded-full shadow-md"
              onPress={fetchJobSeekers}
            >
              <Icon name="add" size={24} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="flex-1 mt-[200px]">
        {loading ? (
          <Text>Loading...</Text>
        ) : showJobSeekers ? (
          <UserCard users={jobSeekers} onPress={createChatWithUser} />
        ) : (
          <InboxList users={inboxData} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
