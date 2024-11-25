import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

interface User {
  id: string;
  name: string;
  profession: string;
  qualification: string;
  location: string;
  profileImageUrl?: string;
}

interface UserCardProps {
  users: User[];
  onPress: (user: User) => void;
}

const AllUserCard: React.FC<UserCardProps> = ({ users, onPress }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          className="flex-row p-4 bg-white rounded-lg mb-2 mt-2"
        >
          <Image
            source={{
              uri: item.profileImageUrl || "https://via.placeholder.com/150",
            }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4 justify-center">
            <Text className="text-lg font-semibold">{item.profession}</Text>
            <Text className="text-sm text-gray-500">{item.qualification}</Text>
            <Text className="text-sm text-gray-500">{item.location}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
};

export default AllUserCard;
