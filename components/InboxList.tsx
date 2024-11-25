import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { db } from "@/firebaseConfig"; // Adjust the import path accordingly
import InboxItem from "@/components/InboxItem"; // Adjust the import path accordingly
import { images } from "@/constants";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  Query,
  CollectionReference,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { ImageSourcePropType } from "react-native";

interface Chat {
  id: string;
  image: string;
  title: string;
  description: string;
  time: string;
}

interface User {
  id: string;
  name: string;
  role: string; // Added role property
  profileImageUrl?: string;
}

interface InboxListProps {
  users: User[]; // Define users prop
}

const truncate = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

const InboxList: React.FC<InboxListProps> = ({ users }) => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const { user } = useUser();
  const currentUserId = user?.id;
  const currentUserRole = user?.publicMetadata?.role; // Assume role is stored in public metadata

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUserId) return;

      const colRef: CollectionReference<DocumentData> = collection(db, "chats");
      const q: Query<DocumentData> = query(
        colRef,
        where("members", "array-contains", currentUserId)
      );

      const querySnapshot = await getDocs(q);
      const chatPromises = querySnapshot.docs.map(async (chatDoc) => {
        const data = chatDoc.data();
        const otherMemberId = data.members.find(
          (memberId: string) => memberId !== currentUserId
        );

        if (otherMemberId) {
          const userDocRef = doc(db, "users", otherMemberId);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            console.error(
              `User data for member ID ${otherMemberId} not found.`
            );
            return null;
          }

          const userData = userDocSnap.data() as User;

          // Filter users based on role
          if (
            (currentUserRole === "JobSeeker" && userData.role !== "Employer") ||
            (currentUserRole === "Employer" && userData.role !== "JobSeeker")
          ) {
            return null;
          }

          // Fetch the last message
          const messagesCollection = collection(
            db,
            `chats/${chatDoc.id}/messages`
          );
          const messagesQuery = query(
            messagesCollection,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const messageSnapshot = await getDocs(messagesQuery);

          if (messageSnapshot.empty) {
            console.log(`No messages found for chat ID ${chatDoc.id}`);
          }

          const lastMessageDoc = messageSnapshot.docs[0];
          const lastMessage = lastMessageDoc?.data()?.text || "No messages yet";
          const lastMessageTime =
            lastMessageDoc
              ?.data()
              ?.timestamp?.toDate()
              ?.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              }) || "";

          return {
            id: chatDoc.id,
            image: userData.profileImageUrl || images.placeholder,
            title: userData.name,
            description: truncate(lastMessage, 40), // Truncate to 40 characters
            time: lastMessageTime,
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
  }, [currentUserId, currentUserRole]);

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
