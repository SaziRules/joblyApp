import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { images } from "@/constants";

const jobspec = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 250 }}
          />
          <Text className="text-3xl text-black font-JakartaSemiBold absolute bottom-5 left-7">
            Sanlam Group
          </Text>
        </View>

        <View className="p-7">
          <Text className="font-JakartaBold text-xl">Software Engineer</Text>
          <Text className="font-Jakarta text-base">
            Renumeration: R46000 - R67000
          </Text>
        </View>

        <View className="p-7">
          <Text className="font-JakartaBold text-xl pb-2">Job Desription</Text>
          <Text className="font-Jakarta text-base">
            Each time you access or use Jobly’s online and/or mobile services
            and websites, including any Jobly mobile application and browser
            extension or plugin, regardless of where it is downloaded from
            (collectively, the “Jobly Apps”), and any software, service,
            feature, product, program and element (including e-mail messages,
            notifications, and other messages) provided by or on behalf of Jobly
            on or in connection with such services or websites (collectively,
            the “Site”), including any products, programs, and services
            described in these Terms of Service.
          </Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold text-xl pb-2">Job Duties</Text>
          <Text className="font-Jakarta text-base">
            Each time you access or use Jobly’s online and/or mobile services
            and websites, including any Jobly mobile application and browser
            extension or plugin, regardless of where it is downloaded from
            (collectively, the “Jobly Apps”), and any software, service,
            feature, product, program and element (including e-mail messages,
            notifications, and other messages) provided by or on behalf of Jobly
            on or in connection with such services or websites (collectively,
            the “Site”), including any products, programs, and services
            described in these Terms of Service.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default jobspec;
