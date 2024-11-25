import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { images } from "@/constants";
import InboxList from "@/components/InboxList";
import { useUser } from "@clerk/clerk-expo";

interface User {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

const Chat = () => {
  const [inboxData, setInboxData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const currentUserRole = user?.publicMetadata?.role;

  useEffect(() => {
    const fetchInboxData = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map((doc) => doc.data() as User);

        // Filter users based on role
        const filteredUsers = users.filter((user) => {
          if (currentUserRole === "JobSeeker" && user.role === "Employer") {
            return true;
          }
          if (currentUserRole === "Employer" && user.role === "JobSeeker") {
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
          <TouchableOpacity
            className="bg-white p-2 rounded-full shadow-md"
            onPress={() => {
              // Add your action here
              console.log("Add new chat");
            }}
          >
            <Icon name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 mt-[200px]">
        {loading ? <Text>Loading...</Text> : <InboxList users={inboxData} />}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
