import InboxList from "@/components/InboxList";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex flex-row px-5 pt-12 items-center mb-3 justify-start space-x-2">
          <View className="bg-[#FEC300] px-[11px] py-1 mt-5 rounded-full">
            <TouchableOpacity>
              <Text className="text-[13px] font-medium text-white">Inbox</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#fff] px-[11px] py-1 mt-5 rounded-full">
            <TouchableOpacity>
              <Text className="text-[13px] font-medium text-[#1e1e1e]">
                Outbox
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#fff] px-[11px] py-1 mt-5 rounded-full">
            <TouchableOpacity>
              <Text className="text-[13px] font-medium text-[#1e1e1e]">
                Drafts
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-[#fff] px-[11px] py-1 mt-5 rounded-full">
            <TouchableOpacity>
              <Text className="text-[13px] font-medium text-[#1e1e1e]">
                Contacts
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
        <InboxList />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Chat;
