import JobCard from "@/components/JobCard";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
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

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<string>("applied"); // Default to 'applied'
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]); // State to track applied jobs

  useEffect(() => {
    const fetchJobs = async () => {
      const colRef: CollectionReference<DocumentData> = collection(
        db,
        "vacancies"
      );
      const q = query(colRef, where("Status", "==", status)); // Fetch only documents with the selected Status

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          console.log("Documents found:", querySnapshot.size);
        }
        const jobsList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Job;
          console.log("Document data:", data);

          // Apply truncation safely
          const positionTruncated = truncate(data.Position, 30);
          const companyTruncated = truncate(data.Company, 30);
          const descriptionTruncated = truncate(data.description, 50);

          return {
            id: doc.id,
            Position: positionTruncated,
            Company: companyTruncated,
            Salary: data.Salary ?? "N/A",
            Type: data.Type ?? "N/A",
            Location: data.Location ?? "N/A",
            Setting: data.Setting ?? "N/A",
            description: descriptionTruncated,
            Description: data.Description ?? "N/A",
            Deadline: data.Deadline ?? "N/A",
            Education: data.Education ?? "N/A",
            Experience: data.Experience ?? "N/A",
            Skills: data.Skills ?? "N/A",
            Duties: data.Duties ?? "N/A",
            Benefits: data.Benefits ?? "N/A",
            createdAt: data.createdAt?.toDate() ?? new Date(),
          };
        });
        console.log("Fetched Jobs List: ", jobsList);
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchJobs();
  }, [status]);

  return (
    <SafeAreaView>
      <View className="flex flex-row px-5 pt-12 items-center justify-between">
        {["Pending", "Accepted", "Rejected", "Cancelled"].map((statusLabel) => (
          <View
            key={statusLabel}
            className={`px-[11px] py-1 mt-5 rounded-full ${
              status === statusLabel.toLowerCase()
                ? "bg-[#FEC300]"
                : "bg-[#fff]"
            }`}
          >
            <TouchableOpacity
              onPress={() => setStatus(statusLabel.toLowerCase())}
            >
              <Text
                className={`text-[13px] font-medium ${
                  status === statusLabel.toLowerCase()
                    ? "text-white"
                    : "text-[#1e1e1e]"
                }`}
              >
                {statusLabel}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <JobCard
        data={jobs}
        appliedJobs={appliedJobs}
        setAppliedJobs={setAppliedJobs}
      />
    </SafeAreaView>
  );
};

export default Jobs;
