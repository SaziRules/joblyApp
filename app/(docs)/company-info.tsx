import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View, TextInput } from "react-native";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import CustomButton from "@/components/CustomButton";
import { useUser } from "@clerk/clerk-expo"; // Hook to get logged-in user

const CompanyInfo = () => {
  const [step, setStep] = useState(1); // Initialize step state
  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    contact_number: "",
    email: "",
    location: "",
    profileImageUrl: "", // Add field for image URL
    founded_date: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { user } = useUser(); // Get logged-in user

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
      setForm({ ...form, founded_date: date.toISOString().split("T")[0] });
    } else {
      Alert.alert(
        "Invalid date",
        "Please select a date between 18 and 45 years old."
      );
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return Object.values(form).every((value) => value.trim() !== "");
  };

  const submitUserData = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (user?.id) {
      // Ensure user.id is defined and not null
      try {
        const userDocRef = doc(db, "users", user.id); // Use logged-in user's ID
        await updateDoc(userDocRef, form);
        Alert.alert("Company information updated successfully!");
        router.replace("/(tabs)/profile");
      } catch (error) {
        const errorMessage = (error as { message: string }).message;
        Alert.alert("Error updating company information:", errorMessage);
      }
    } else {
      Alert.alert("Error", "User is not logged in.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Edit Profile
          </Text>
        </View>
        <View className="p-5">
          {step === 1 && (
            <>
              <InputField
                label="Company Name"
                placeholder="Enter your first name"
                value={form.company_name}
                onChangeText={(value) =>
                  handleInputChange("company_name", value)
                }
              />
              <InputField
                label="Industry"
                placeholder="Enter your industry of operation"
                value={form.industry}
                onChangeText={(value) => handleInputChange("industry", value)}
              />
              <InputField
                label="Funded in"
                placeholder="Enter date your company was created"
                value={form.founded_date}
                onTouchEnd={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <InputField
                label="Company Location"
                placeholder="City, Country"
                value={form.location}
                onChangeText={(value) => handleInputChange("location", value)}
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
                  router.replace("/(tabs)/profile");
                }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <InputField
                label="Your Email"
                placeholder="Enter your email address"
                value={form.email}
                onChangeText={(value) => handleInputChange("email", value)}
              />
              <InputField
                label="Contact Number"
                placeholder="Enter your contact number"
                value={form.contact_number}
                onChangeText={(value) =>
                  handleInputChange("contact_number", value)
                }
              />
              <InputField
                label="Profile Image URL"
                placeholder="Enter the URL of your profile image"
                value={form.profileImageUrl}
                onChangeText={(value) =>
                  handleInputChange("profileImageUrl", value)
                }
              />

              <CustomButton
                title="Save Changes"
                className="mt-6"
                onPress={submitUserData}
              />
              <CustomButton
                title="Go Back"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => setStep(step - 1)}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default CompanyInfo;
