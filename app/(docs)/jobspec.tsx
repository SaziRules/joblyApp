import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useLocalSearchParams, router } from "expo-router";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface JobData {
  id: string;
  Company: string;
  Position: string;
  Salary: string;
  Description: string;
  Duties: string;
  Benefits: string;
  Education: string;
  Experience: string;
  Skills: string;
  Location: string;
  Type: string;
  Setting: string;
  Deadline: string;
}

const JobSpec: React.FC = () => {
  const { job } = useLocalSearchParams();
  const [hasApplied, setHasApplied] = useState(false);

  // Assume currentUser is the authenticated user viewing the job
  const currentUser = { id: "currentUserId" }; // Replace with actual user ID

  let jobData: JobData;
  try {
    console.log("Received job parameter:", job);
    jobData = JSON.parse(job as string);
    console.log("Parsed jobData:", jobData);
  } catch (error) {
    console.error("Error parsing job JSON:", error);
    return <Text>Error loading job details</Text>;
  }

  const handleApplyNow = async () => {
    try {
      const jobRef = doc(db, "vacancies", jobData.id);
      const applicationsRef = collection(jobRef, "applications");

      // Add a new application document
      await addDoc(applicationsRef, {
        userId: currentUser.id,
        status: "applied",
      });

      Alert.alert(
        "Application Submitted",
        "Your application has been successfully submitted!"
      );
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error applying for job: ", error);
      Alert.alert("Error", "There was an error applying for the job.");
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const jobRef = doc(db, "vacancies", jobData.id);
      const applicationsRef = collection(jobRef, "applications");
      const q = query(applicationsRef, where("userId", "==", currentUser.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasApplied(true);
        console.log("User has already applied for this job.");
      } else {
        console.log("User has not applied for this job.");
      }
    } catch (error) {
      console.error("Error checking application status: ", error);
    }
  };

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white mb-[60px]">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signUpCar}
              style={{ zIndex: 0, width: "100%", height: 250 }}
            />
            <Text className="text-3xl text-black font-JakartaSemiBold absolute bottom-5 left-7">
              {jobData.Company}
            </Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">{jobData.Position}</Text>
            <Text className="font-Jakarta text-base">
              Renumeration: {jobData.Salary}
            </Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl pb-2">
              Job Description
            </Text>
            <Text className="font-Jakarta text-base">
              {jobData.Description}
            </Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl pb-2">Job Duties</Text>
            <Text className="font-Jakarta text-base">{jobData.Duties}</Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">Benefits</Text>
            <Text className="font-Jakarta text-base">{jobData.Benefits}</Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">
              Education Requirements
            </Text>
            <Text className="font-Jakarta text-base">{jobData.Education}</Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">Work Experience</Text>
            <Text className="font-Jakarta text-base">{jobData.Experience}</Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">Applicable Skills</Text>
            <Text className="font-Jakarta text-base">{jobData.Skills}</Text>
          </View>
          <View className="p-7">
            <Text className="font-JakartaBold text-xl">Location</Text>
            <Text className="font-Jakarta text-base">{jobData.Location}</Text>
          </View>
          <View className="p-7 mt-[-40px]">
            <Text className="font-JakartaBold text-xl">Job Type</Text>
            <Text className="font-Jakarta text-base">{jobData.Type}</Text>
          </View>
          <View className="p-7 mt-[-40px]">
            <Text className="font-JakartaBold text-xl">Job Setting</Text>
            <Text className="font-Jakarta text-base">{jobData.Setting}</Text>
          </View>
          <View className="p-7 mt-[-40px] mb-[100px]">
            <Text className="font-JakartaBold text-xl">Deadline</Text>
            <Text className="font-Jakarta text-base">{jobData.Deadline}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full mb-4 p-4">
        <CustomButton
          title={hasApplied ? "Applied" : "Apply Now"}
          onPress={handleApplyNow}
          disabled={hasApplied}
          className={hasApplied ? "bg-gray-500" : ""}
        />
        <CustomButton
          title="Cancel"
          className="bg-[#2e2e2e] mt-4"
          onPress={() => {
            router.replace("/(tabs)/home");
          }}
        />
      </View>
    </View>
  );
};

export default JobSpec;
