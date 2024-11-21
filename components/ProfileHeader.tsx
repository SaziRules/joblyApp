import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const ProfileHeader = () => {
  const { user } = useUser();
  return (
    <View className="flex items-center justify-center">
      <Image
        source={images.user}
        className="h-[112px] w-[112px] rounded-full"
      />
      <View className="flex pt-1 items-center justify-center">
        <Text className="font-JakartaBold text-[22px] text-[#1e1e1e]">
          Martha Solvaik
        </Text>
        <Text className="font-Jakarta text-[#9b9a9a] text-[13px]">
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>
      <View className="bg-[#FEC300] px-2 py-1 mt-5 rounded-full">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(docs)/profiledata");
          }}
        >
          <Text className="text-[12px] text-[#1e1e1e]">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
