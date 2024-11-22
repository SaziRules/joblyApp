// InboxItem.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

interface InboxItemProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  time: string;
}

const InboxItem: React.FC<InboxItemProps> = ({
  image,
  title,
  description,
  time,
}) => {
  return (
    <TouchableOpacity className="flex-row justify-between p-5 mx-5 mt-2 bg-white rounded-lg">
      <View className="flex-row items-center space-x-2 justify-start">
        <View className="ml-[-7px]">
          <Image source={image} className="h-[40px] w-[40px] rounded-full" />
        </View>
        <View>
          <Text className="text-[#9b9a9a] font-bold">{title}</Text>
          <Text className="text-[#9b9a9a] text-[12px]">{description}</Text>
        </View>
      </View>
      <View>
        <Text className="text-[#9b9a9a] text-[10px]">{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default InboxItem;
