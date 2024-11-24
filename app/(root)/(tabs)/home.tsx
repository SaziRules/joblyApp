import JobCard from "@/components/JobCard";
import { useUser } from "@clerk/clerk-expo";
import { Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Job } from "@/types/type";

const truncate = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

const formatDate = (date: Date) => {
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return `${diffDays} days ago`;
};

export default function Page() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    const fetchJobs = async () => {
      let colRef: CollectionReference<DocumentData> = collection(db, "jobs");
      let q: Query<DocumentData> = colRef;

      if (position) {
        q = query(colRef, where("Position", "==", position));
      }

      const querySnapshot = await getDocs(q);
      const jobsList = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Job;
        return {
          id: doc.id,
          Position: truncate(data.Position, 30),
          Company: truncate(data.Company, 30),
          Salary: data.Salary,
          Type: data.Type,
          Location: data.Location,
          Setting: data.Setting,
          description: truncate(data.description, 50),
          Description: data.Description,
          Deadline: data.Deadline,
          Education: data.Education,
          Experience: data.Experience,
          Skills: data.Skills,
          Duties: data.Duties,
          Benefits: data.Benefits,
          createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JS Date
        };
      });
      setJobs(jobsList);
    };

    fetchJobs();
  }, [position]);

  return (
    <ScrollView>
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

        <JobCard data={jobs} />
      </SafeAreaView>
    </ScrollView>
  );
}
