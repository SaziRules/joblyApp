import { icons, images } from "@/constants";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Vacancy = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
              Post a vacancy
            </Text>
          </View>
          <View className="p-5">
            <InputField
              label="First Name"
              placeholder="Enter your first name"
              icon={icons.person}
            />
            <InputField
              label="Last Name"
              placeholder="Enter your last name"
              icon={icons.person}
            />
            <InputField
              label="Gender"
              placeholder="Select your gender"
              icon={icons.person}
              secureTextEntry={true}
            />
            <InputField
              label="Date Of Birth"
              placeholder="Enter your date of birth"
              icon={icons.email}
            />

            <CustomButton title="Sign Up" className="mt-6" />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Vacancy;
