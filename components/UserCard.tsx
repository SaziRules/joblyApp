import React, { useState } from "react";
import { icons } from "@/constants";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import PaymentModal from "./PaymentModal"; // Import the PaymentModal component

interface UserCardProps {
  users: {
    id: string;
    name: string;
    profession: string;
    qualification: string;
    location: string; // Added location to the props
    profileImageUrl?: string;
  }[];
  onPress: () => void; // Add onPress to props
}

const UserCard: React.FC<UserCardProps> = ({ users, onPress }) => {
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handlePress = () => {
    setModalVisible(true); // Show the modal
  };

  return (
    <>
      <ScrollView className="h-full">
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={handlePress}
            className="bg-white rounded-lg mt-4 p-4 mx-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri:
                      user.profileImageUrl || "https://via.placeholder.com/150",
                  }}
                  className="h-16 w-16 rounded-full"
                />
                <View className="ml-4">
                  <Text className="text-lg font-JakartaBold">
                    {user.profession}
                  </Text>
                  <Text className="text-gray-500 font-Jakarta">
                    {user.qualification}
                  </Text>
                  <Text className="text-gray-500 font-Jakarta">
                    {user.location}
                  </Text>
                </View>
              </View>
              <View>
                <Image source={icons.eyecross} className="h-5 w-5" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <PaymentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default UserCard;
