import { Job } from "@/types/type";
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, images } from "@/constants";

const JobCard = () => {
  return (
    <View className="flex py-4 px-4 bg-white mx-5 rounded-lg mt-5">
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity className="flex flex-row items-center justify-center space-x-2">
          <Image
            source={images.airbnb}
            className="w-[40px] h-[40px] rounded-full items-center justify-center"
          />
          <Text className="text-[16px] text-[#9b9a9a] font-JakartaMedium">
            Airbnb
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={icons.heart} className="h-[20px] w-[20px] mt-[-20]" />
        </TouchableOpacity>
      </View>

      <View className="flex pt-2">
        <TouchableOpacity>
          <Text className="font-JakartaSemiBold text-[16px] text-[#1e1e1e]">
            Front-End Developer
          </Text>
        </TouchableOpacity>
        <Text className="font-JakartaSemiBold text-[11px] text-[#FEC300]">
          R20000 - R30000 / Month
        </Text>
        <TouchableOpacity className="bg-[#FEC300] rounded-full w-[100px] py-2 px-2 flex items-center mt-5">
          <Text className="text-[12px] text-[#1e1e1e]">Easily Apply</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between items-center mt-5">
        <View className="flex-row space-x-1 items-center">
          <Image source={icons.point} className="h-[20px] w-[20px]" />
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
            Durban
          </Text>
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">-</Text>
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
            On site
          </Text>
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">-</Text>
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
            Full time
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
            2 weeks ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
