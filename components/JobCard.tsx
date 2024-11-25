import { Job } from "@/types/type";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { icons, images } from "@/constants";
import { router } from "expo-router";

interface JobCardProps {
  data: Job[]; // Ensure data prop is passed
  appliedJobs: string[];
  setAppliedJobs: (jobs: string[]) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  data,
  appliedJobs,
  setAppliedJobs,
}) => {
  if (!data || data.length === 0) {
    console.log("No data found or data is empty.");
    return (
      <Text className="text-center text-gray-500">No jobs available.</Text>
    );
  }

  const currentUser = { id: "currentUserId" }; // Replace with actual user ID
  const [applicationStatus, setApplicationStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchApplicationStatuses = async () => {
      const statusMap: { [key: string]: boolean } = {};
      for (const job of data) {
        const jobRef = collection(db, "vacancies", job.id, "applications");
        const q = query(jobRef, where("userId", "==", currentUser.id));
        const querySnapshot = await getDocs(q);
        statusMap[job.id] = !querySnapshot.empty;
      }
      setApplicationStatus(statusMap);
    };

    fetchApplicationStatuses();
  }, [data]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const hasApplied = applicationStatus[item.id];
        return (
          <TouchableOpacity
            key={item.id}
            className="flex py-4 px-4 bg-white rounded-lg mt-5"
            onPress={() => {
              router.push({
                pathname: "/(docs)/jobspec",
                params: {
                  job: JSON.stringify(item),
                },
              });
            }}
          >
            <View className="flex-row justify-between items-center">
              <TouchableOpacity className="flex-row items-center space-x-2">
                <Image
                  source={images.airbnb}
                  className="w-[40px] h-[40px] rounded-full items-center justify-center"
                />
                <Text className="text-[16px] text-[#9b9a9a] font-JakartaMedium">
                  {item.Company}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={icons.heart} className="h-5 w-5" />
              </TouchableOpacity>
            </View>

            <View className="pt-2">
              <TouchableOpacity>
                <Text className="font-JakartaSemiBold text-[16px] text-[#1e1e1e]">
                  {item.Position}
                </Text>
              </TouchableOpacity>
              <Text className="font-JakartaSemiBold text-[11px] text-[#FEC300]">
                {item.Salary} / Month
              </Text>
              <TouchableOpacity
                className={`${
                  hasApplied ? "bg-gray-300" : "bg-[#FEC300]"
                } rounded-full w-[100px] py-2 px-2 flex items-center mt-5 mb-2`}
                disabled={hasApplied}
                onPress={() => {
                  if (!hasApplied) {
                    router.push({
                      pathname: "/(docs)/jobspec",
                      params: {
                        job: JSON.stringify(item),
                      },
                    });
                  }
                }}
              >
                <Text className="text-[12px] font-JakartaBold text-[#1e1e1e]">
                  {hasApplied ? "Applied" : "Easily Apply"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <View className="flex-row space-x-1 items-center">
                <Image source={icons.point} className="h-5 w-5" />
                <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
                  {item.Location} - {item.Setting} - {item.Type}
                </Text>
              </View>
              <View>
                <Text className="font-Jakarta text-[12px] text-[#9b9a9a]">
                  2 weeks ago
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default JobCard;
