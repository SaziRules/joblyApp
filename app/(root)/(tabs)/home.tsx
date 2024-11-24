import JobCard from "@/components/JobCard";
import { useUser } from "@clerk/clerk-expo";
import { Text, TextInput, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Job } from "@/types/type";

const truncate = (str: string, maxLength: number) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export default function Page() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [position, setPosition] = useState<string>("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]); // State to track applied jobs

  useEffect(() => {
    const fetchJobs = async () => {
      const colRef: CollectionReference<DocumentData> = collection(
        db,
        "vacancies"
      ); // Ensure collection name is "vacancies"

      try {
        const querySnapshot = await getDocs(colRef); // Fetch all documents without filter
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          console.log("Documents found:", querySnapshot.size);
        }
        const jobsList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Job;
          console.log("Document data:", data); // Log each document data

          // Check and log each field to ensure data integrity
          console.log("Position:", data.Position);
          console.log("Company:", data.Company);
          console.log("Salary:", data.Salary);
          console.log("Type:", data.Type);
          console.log("Location:", data.Location);
          console.log("Setting:", data.Setting);
          console.log("description:", data.description);

          // Apply truncation safely
          const positionTruncated = truncate(data.Position, 30);
          const companyTruncated = truncate(data.Company, 30);
          const descriptionTruncated = truncate(data.description, 50);

          return {
            id: doc.id,
            Position: positionTruncated,
            Company: companyTruncated,
            Salary: data.Salary,
            Type: data.Type,
            Location: data.Location,
            Setting: data.Setting,
            description: descriptionTruncated,
            Description: data.Description,
            Deadline: data.Deadline,
            Education: data.Education,
            Experience: data.Experience,
            Skills: data.Skills,
            Duties: data.Duties,
            Benefits: data.Benefits,
            createdAt: data.createdAt?.toDate(), // Ensure Firestore Timestamp to JS Date conversion
          };
        });
        console.log("Fetched Jobs List: ", jobsList); // Log the full jobs list
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs: ", error); // Log any errors
      }
    };

    fetchJobs();
  }, []);

  return (
    <SafeAreaView>
      <View className="flex px-5 pt-10">
        <Text className="font-JakartaSemiBold text-lg">
          Find your perfect job
        </Text>
        <Text className="font-Jakarta text-[14px] text-[#9b9a9a9a]">
          Based on your preferences on Jobly
        </Text>
      </View>
      <View className="mx-4 mt-4">
        <TextInput
          placeholder="Search by position..."
          value={position}
          onChangeText={setPosition}
          className="p-3 bg-gray-200 rounded-full mb-2"
        />
      </View>

      <JobCard
        data={jobs}
        appliedJobs={appliedJobs}
        setAppliedJobs={setAppliedJobs}
      />
    </SafeAreaView>
  );
}
