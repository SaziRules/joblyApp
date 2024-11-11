import ProfileHeader from "@/components/ProfileHeader";
import { icons } from "@/constants";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View className=" flex px-5 pt-10 items-center justify-center">
          <ProfileHeader />
        </View>
        <View>
          <View className="flex-row justify-between items-center px-5 mt-6">
            <Text className="font-JakartaBold text-[16px] text-[#1e1e1e]">
              My Resume
            </Text>
          </View>
          <View>
            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-5">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Front-End Developer
                  </Text>
                  <Text className=" text-[11px] text-[#9b9a9a] ">
                    Last updated 18.11.2023
                  </Text>
                </View>
                <View>
                  <Text className="text-[12px]">Edit</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    .Net Developer
                  </Text>
                  <Text className=" text-[11px] text-[#9b9a9a] ">
                    Last updated 14.02.2024
                  </Text>
                </View>
                <View>
                  <Text className="text-[12px]">Edit</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center px-5 mt-6">
            <Text className="font-JakartaBold text-[16px] text-[#1e1e1e]">
              My Details
            </Text>
          </View>
          <View>
            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-5">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Full Name
                  </Text>
                </View>
                <View className=" flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a] ">
                    Martha Solvaik
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Email
                  </Text>
                </View>
                <View className=" flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a] ">
                    msolvaik@jobly.co.za
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Contact Number
                  </Text>
                </View>
                <View className=" flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a] ">
                    +27 86 456 7890
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Gender
                  </Text>
                </View>
                <View className=" flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a] ">Female</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
