import { icons, images } from "@/constants";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

const Resume = () => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const hideModal = () => {
    setModalVisibility(false);
  };
  const [step, setStep] = useState(1); // Initialize step state

  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthday: "",
    location: "",
    email: "",
    phone: "",
    summary: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 45);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (date >= minDate && date <= maxDate) {
      hideDatePicker();
      setForm({ ...form, birthday: date.toISOString().split("T")[0] });
    } else {
      Alert.alert(
        "Invalid date",
        "Please select a date between 18 and 45 years old."
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Resume
          </Text>
        </View>
        <View className="p-5">
          {step === 1 && (
            <>
              <InputField
                label="Full  Name"
                placeholder="Enter your full name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Gender"
                placeholder="Select your gender"
                icon={icons.person}
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
              />
              <InputField
                label="Date Of Birth"
                placeholder="Enter your date of birth"
                icon={icons.person}
                value={form.birthday}
                onTouchEnd={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <InputField
                label="Your Location"
                placeholder="Enter your physical address"
                icon={icons.map}
                value={form.location}
                onChangeText={(value) => setForm({ ...form, location: value })}
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Cancel"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => {
                  router.replace("/(tabs)/create");
                }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <InputField
                label="Your Email"
                placeholder="Enter your email address"
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Contact Number"
                placeholder="Enter your contact number"
                icon={icons.person}
                value={form.phone}
                onChangeText={(value) => setForm({ ...form, phone: value })}
              />
              <InputField
                label="Profile Summary"
                placeholder="Tell us what you are about"
                value={form.summary}
                multiline
                onChangeText={(value) => setForm({ ...form, summary: value })}
                className="rounded-lg h-[130px] bg-neutral-100"
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Cancel"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => {
                  router.replace("/(tabs)/create");
                }}
              />
            </>
          )}

          {step === 3 && (
            <>
              <InputField
                label="Work History"
                placeholder="Enter the job title"
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Gender"
                placeholder="Select your gender"
                icon={icons.person}
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
              />
              <InputField
                label="Date Of Birth"
                placeholder="Enter your date of birth"
                icon={icons.person}
                value={form.birthday}
                onChangeText={(value) => setForm({ ...form, birthday: value })}
              />
              <InputField
                label="Your Location"
                placeholder="Enter your physical address"
                icon={icons.map}
                value={form.location}
                onChangeText={(value) => setForm({ ...form, location: value })}
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Cancel"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => {
                  router.replace("/(tabs)/create");
                }}
              />
            </>
          )}

          {step === 4 && (
            <>
              <InputField
                label="Full  Name"
                placeholder="Enter your full name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Gender"
                placeholder="Select your gender"
                icon={icons.person}
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
              />
              <InputField
                label="Date Of Birth"
                placeholder="Enter your date of birth"
                icon={icons.person}
                value={form.birthday}
                onChangeText={(value) => setForm({ ...form, birthday: value })}
              />
              <InputField
                label="Your Location"
                placeholder="Enter your physical address"
                icon={icons.map}
                value={form.location}
                onChangeText={(value) => setForm({ ...form, location: value })}
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Cancel"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => {
                  router.replace("/(tabs)/create");
                }}
              />
            </>
          )}

          {step === 5 && (
            <>
              <InputField
                label="Full  Name"
                placeholder="Enter your full name"
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Gender"
                placeholder="Select your gender"
                icon={icons.person}
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
              />
              <InputField
                label="Date Of Birth"
                placeholder="Enter your date of birth"
                icon={icons.person}
                value={form.birthday}
                onChangeText={(value) => setForm({ ...form, birthday: value })}
              />
              <InputField
                label="Your Location"
                placeholder="Enter your physical address"
                icon={icons.map}
                value={form.location}
                onChangeText={(value) => setForm({ ...form, location: value })}
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Cancel"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => {
                  router.replace("/(tabs)/create");
                }}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Resume;
