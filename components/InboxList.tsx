import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { db } from "@/firebaseConfig"; // Adjust the import path accordingly
import InboxItem from "@/components/InboxItem"; // Adjust the import path accordingly
import { images } from "@/constants";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { ImageSourcePropType } from "react-native";

interface Chat {
  id: string;
  image: string; // Make image non-optional
  title: string;
  description: string;
  time: string;
}

interface User {
  id: string;
  name: string;
  profileImageUrl?: string;
}

const InboxList: React.FC = () => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const { user } = useUser();
  const currentUserId = user?.id;

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUserId) return;

      const colRef: CollectionReference<DocumentData> = collection(db, "chats");
      const q: Query<DocumentData> = query(
        colRef,
        where("members", "array-contains", currentUserId)
      );

      const querySnapshot = await getDocs(q);
      const chatPromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const otherMemberId = data.members.find(
          (memberId: string) => memberId !== currentUserId
        );

        if (otherMemberId) {
          const userDoc = await getDocs(
            query(collection(db, "users"), where("id", "==", otherMemberId))
          );
          const userData = userDoc.docs[0]?.data() as User;

          return {
            id: doc.id,
            image: userData.profileImageUrl || images.placeholder,
            title: userData.name,
            description: data.description,
            time: data.time,
          };
        }

        return null;
      });

      const chatsData = (await Promise.all(chatPromises)).filter(
        (chat): chat is Chat => chat !== null
      );
      setMessages(chatsData);
    };

    fetchChats();
  }, [currentUserId]);

  const getImageSource = (image: string): ImageSourcePropType => {
    return { uri: image };
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <InboxItem
          image={getImageSource(item.image)}
          title={item.title}
          description={item.description}
          time={item.time}
        />
      )}
    />
  );
};

export default InboxList;
