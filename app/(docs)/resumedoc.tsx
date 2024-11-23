import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useLocalSearchParams, router } from "expo-router";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface ResumeData {
  name: string;
  profession: string;
  summary: string;
  education: string;
  workHistory: string;
  certification: string;
  skill: string;
  work_description: string;
  qualification_samary: string;
  language: string;
  birthday: string;
  gender: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  references: string;
}

const ResumeDoc: React.FC = () => {
  const { userId } = useLocalSearchParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("UserID:", userId); // Log userId for debugging
    if (!userId) {
      console.error("No userId provided.");
      setLoading(false);
      return;
    }

    const fetchResumeData = async () => {
      try {
        const docRef = doc(db, "resumes", userId as string); // Ensure userId is a string
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as ResumeData;
          console.log("Resume Data:", data); // Log resume data for debugging
          setResumeData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [userId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FEC300" />
      </View>
    );
  }

  if (!resumeData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No resume data found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 250 }}
          />
          <Text className="text-3xl text-black font-JakartaSemiBold absolute bottom-6 left-7">
            {resumeData.name}
          </Text>
          <Text className="font-JakartaMedium absolute text-base left-8 bottom-1">
            {resumeData.profession}
          </Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold pb-2 text-xl">About me</Text>
          <Text className="font-Jakarta text-base">{resumeData.summary}</Text>
        </View>

        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">
            Certifications & Accreditations
          </Text>
          <Text className="font-Jakarta text-base">
            {resumeData.certification}
          </Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold text-xl">Applicable Skills</Text>
          <Text className="font-Jakarta text-base">{resumeData.skill}</Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">Work History</Text>
          <Text className="font-Jakarta text-base">
            {resumeData.workHistory}
          </Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold text-xl pb-2">
            Work Description
          </Text>
          <Text className="font-Jakarta text-base">
            {resumeData.work_description}
          </Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">
            Educational Background
          </Text>
          <Text className="font-Jakarta text-base">{resumeData.education}</Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold text-xl pb-2">
            Qualification Summary
          </Text>
          <Text className="font-Jakarta text-base">
            {resumeData.qualification_samary}
          </Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">Languages</Text>
          <Text className="font-Jakarta text-base">{resumeData.language}</Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">Date of Birth</Text>
          <Text className="font-Jakarta text-base">{resumeData.birthday}</Text>
        </View>
        <View className="p-7">
          <Text className="font-JakartaBold text-xl">Gender</Text>
          <Text className="font-Jakarta text-base">{resumeData.gender}</Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">Contact Details</Text>
          <Text className="font-Jakarta text-base">
            Location: {resumeData.location}
          </Text>
          <Text className="font-Jakarta text-base">
            Email: {resumeData.email}
          </Text>
          <Text className="font-Jakarta text-base">
            Contact Number: {resumeData.phone}
          </Text>
        </View>
        <View className="p-7 mb-[-7%]">
          <Text className="font-JakartaBold text-xl">Socials</Text>
          <Text className="font-Jakarta text-base">{resumeData.linkedin}</Text>
        </View>
        <View className="p-7 mb-[50%]">
          <Text className="font-JakartaBold text-xl">References</Text>
          <Text className="font-Jakarta text-base">
            {resumeData.references}
          </Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full mb-4 p-4">
        <CustomButton title="Download" />
        <CustomButton
          title="Close"
          className="bg-[#2e2e2e] mt-4"
          onPress={() => {
            router.replace("/(tabs)/profile");
          }}
        />
      </View>
    </View>
  );
};

export default ResumeDoc;
