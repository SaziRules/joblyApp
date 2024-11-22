// InboxList.tsx
import React from "react";
import { View, FlatList } from "react-native";
import { images } from "@/constants";
import InboxItem from "@/components/InboxItem"; // Adjust the import path accordingly

const messages = [
  {
    id: "1",
    image: images.airbnb,
    title: "Airbnb",
    description: "Over the last decade, Airbnb has grown fr...",
    time: "15:45",
  },
  // Add more messages as needed
];

const InboxList = () => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <InboxItem
          image={item.image}
          title={item.title}
          description={item.description}
          time={item.time}
        />
      )}
    />
  );
};

export default InboxList;
