import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

interface UserCardProps {
  users: {
    id: string;
    name: string;
    profession: string;
    qualification: string;
    profileImageUrl?: string;
  }[];
  onPress: () => void; // Add onPress to props
}

const UserCard: React.FC<UserCardProps> = ({ users, onPress }) => {
  return (
    <ScrollView className="h-full">
      <>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={onPress}
            className="bg-white rounded-lg mt-4 p-4 mx-4 "
          >
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
                <Text className="text-gray-500 font-JakartaBold">
                  {user.qualification}
                </Text>
                <Text className="text-gray-500 font-Jakarta">
                  {user.profession}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
    </ScrollView>
  );
};

export default UserCard;
