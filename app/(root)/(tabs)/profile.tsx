import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { router } from "expo-router";
import ProfileHeader from "@/components/ProfileHeader";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    full_name: "",
    company_name: "",
    industry: "",
    email: "",
    contact_number: "",
    gender: "",
    location: "",
    qualification: "",
    profession: "",
    role: "", // Add role to the state
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.id) {
        const docRef = doc(db, "users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            full_name: `${data.first_name} ${data.last_name}`,
            email: data.email,
            contact_number: data.contact_number,
            gender: data.gender,
            location: data.location,
            qualification: data.qualification,
            profession: data.profession,
            role: data.role, // Add role to the state
            company_name: data.company_name,
            industry: data.industry, // Add industry to the state
          });
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProfileData();
  }, [user?.id]);

  const userId = user?.id;

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex px-5 pt-10 items-center justify-center">
          <ProfileHeader />
        </View>
        <View>
          <View className="flex-row justify-between items-center px-5 mt-6">
            <Text className="font-JakartaBold text-[16px] text-[#1e1e1e]">
              {profileData.role === "Employer"
                ? "Company Profile"
                : "My Resume"}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className="flex p-3 bg-white rounded-lg mx-5 mt-5"
              onPress={() => {
                router.push({
                  pathname:
                    profileData.role === "Employer"
                      ? "/(docs)/company-info"
                      : "/(docs)/resumedoc",
                  params: {
                    userId: userId,
                  },
                });
              }}
            >
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    {profileData.role === "Employer"
                      ? profileData.industry
                      : profileData.profession}
                  </Text>
                  <Text className="text-[11px] text-[#9b9a9a]">
                    Last updated 18.11.2023
                  </Text>
                </View>
                <View>
                  <Text className="text-[12px]">View / Download</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center px-5 mt-6">
            <Text className="font-JakartaBold text-[16px] text-[#1e1e1e]">
              {profileData.role === "Employer" ? "Our Details" : "My Details"}
            </Text>
          </View>
          <View>
            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-5">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    {profileData.role === "Employer"
                      ? "Company Name"
                      : "Full Name"}
                  </Text>
                </View>
                <View className="flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a]">
                    {profileData.role === "Employer"
                      ? profileData.company_name
                      : profileData.full_name}
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
                <View className="flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a]">
                    {profileData.email}
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
                <View className="flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a]">
                    {profileData.contact_number}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    {profileData.role === "Employer" ? "Industry" : "Gender"}
                  </Text>
                </View>
                <View className="flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a]">
                    {profileData.role === "Employer"
                      ? profileData.industry
                      : profileData.gender}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex p-3 bg-white rounded-lg mx-5 mt-3">
              <View className="flex flex-row items-center justify-between">
                <View>
                  <Text className="text-[16px] font-semibold text-[#1e1e1e]">
                    Location
                  </Text>
                </View>
                <View className="flex flex-row items-center space-x-3 justify-between">
                  <Text className="text-[11px] text-[#9b9a9a]">
                    {profileData.location}
                  </Text>
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
