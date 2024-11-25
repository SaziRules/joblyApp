import JobCard from "@/components/JobCard";
import UserCard from "@/components/UserCard"; // Ensure this component is properly imported
import { useUser } from "@clerk/clerk-expo";
import { Text, TextInput, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  DocumentData,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Job } from "@/types/type";

const truncate = (str: string, maxLength: number) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

interface UserCardProps {
  users: {
    id: string;
    name: string;
    profession: string;
    qualification: string;
    location: string; // Correct the spelling of 'location'
    profileImageUrl?: string;
  }[];
  onPress: () => void;
}

export default function Page() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [position, setPosition] = useState<string>("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]); // State to track applied jobs
  const [role, setRole] = useState<string>(""); // State to store user role
  const [jobSeekers, setJobSeekers] = useState<UserCardProps["users"]>([]); // State to store job seekers data
  const [filteredJobSeekers, setFilteredJobSeekers] = useState<
    UserCardProps["users"]
  >([]); // State to store filtered job seekers data
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // State to store filtered jobs

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        const docRef = doc(db, "users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRole(data.role); // Set the user role
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserRole();
  }, [user?.id]);

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
            Status: data.Status ?? "open", // Ensure Status property is included
            createdAt: data.createdAt?.toDate(), // Ensure Firestore Timestamp to JS Date conversion
          };
        });
        console.log("Fetched Jobs List: ", jobsList); // Log the full jobs list
        setJobs(jobsList);
        setFilteredJobs(jobsList); // Initialize filteredJobs with all jobs
      } catch (error) {
        console.error("Error fetching jobs: ", error); // Log any errors
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      const colRef: CollectionReference<DocumentData> = collection(db, "users");
      const q = query(colRef, where("role", "==", "Job-Seeker"));

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          console.log("Documents found:", querySnapshot.size);
        }
        const jobSeekersList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: `${data.first_name} ${data.last_name}`,
            profession: data.profession,
            qualification: data.qualification,
            location: data.location, // Add location to the data fetched
            profileImageUrl: data.profileImageUrl,
          };
        });
        setJobSeekers(jobSeekersList);
        setFilteredJobSeekers(jobSeekersList); // Initialize filteredJobSeekers with all job seekers
      } catch (error) {
        console.error("Error fetching job seekers: ", error);
      }
    };

    if (role === "Employer") {
      fetchJobSeekers();
    }
  }, [role]);

  const handlePositionChange = (text: string) => {
    setPosition(text);
    if (role === "Employer") {
      const filtered = jobSeekers.filter((user) =>
        user.profession.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredJobSeekers(filtered);
    } else if (role === "Job-Seeker") {
      const filtered = jobs.filter((job) =>
        job.Position.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex px-5 pt-10">
        <Text className="font-JakartaSemiBold text-lg">
          {role === "Employer"
            ? "Search verified professionals"
            : "Find your perfect job"}
        </Text>
        <Text className="font-Jakarta text-[14px] text-[#9b9a9a9a]">
          {role === "Employer"
            ? "Based on your immediate needs"
            : "Based on your preferences on Jobly"}
        </Text>
      </View>
      <View className="mx-4 mt-4">
        <TextInput
          placeholder="Search by position..."
          value={position}
          onChangeText={handlePositionChange}
          className="p-3 bg-gray-200 rounded-full mb-2"
        />
      </View>

      {role === "Job-Seeker" && (
        <JobCard
          data={filteredJobs}
          appliedJobs={appliedJobs}
          setAppliedJobs={setAppliedJobs}
        />
      )}
      {role === "Employer" && (
        <UserCard
          users={filteredJobSeekers} // Pass the filtered users array
          onPress={() => console.log("UserCard pressed")} // Example onPress handler
        />
      )}
    </SafeAreaView>
  );
}
