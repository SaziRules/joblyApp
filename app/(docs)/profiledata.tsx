import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "@/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { collection, addDoc, CollectionReference } from "firebase/firestore";
import CustomButton from "@/components/CustomButton";

const profiledata = () => {
  const [step, setStep] = useState(1); // Initialize step state

  const submitUserData = () => {
    // Validate form data (if necessary)

    // Call the new function to submit form data to Firestore
    submitToFirestore(form);
  };

  // ...
  const submitToFirestore = (formData: {
    first_name: string;
    last_name: string;
    contact_number: string;
    email: string;
    gender: string;
    location: string;
    birth_date: string;
    alt_number: string;
  }) => {
    // Submit form data to Firestore
    addDoc(collection(db, "users"), {
      ...formData,
    })
      .then(() => {
        Alert.alert("User information submitted successfully!");
        router.replace("/(tabs)/profile");
      })
      .catch((error: { message: string | undefined }) => {
        Alert.alert("Error submitting user information:", error.message);
      });
  };

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    gender: "",
    location: "",
    birth_date: "",
    alt_number: "",
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
      setForm({ ...form, birth_date: date.toISOString().split("T")[0] });
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
            Edit Profile
          </Text>
        </View>
        <View className="p-5">
          {step === 1 && (
            <>
              <InputField
                label="First Name"
                placeholder="Enter your firstname"
                value={form.first_name}
                onChangeText={(value) =>
                  setForm({ ...form, first_name: value })
                }
              />
              <InputField
                label="Last Name"
                placeholder="Enter your last name"
                value={form.last_name}
                onChangeText={(value) => setForm({ ...form, last_name: value })}
              />
              <InputField
                label="Date of  Birth"
                placeholder="Enter date of birth"
                value={form.birth_date}
                onTouchEnd={showDatePicker}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <InputField
                label="Your Gender"
                placeholder="Enter your dender"
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
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
                label="Your Location"
                placeholder="Tell us where you're want to"
                value={form.location}
                onChangeText={(value) => setForm({ ...form, location: value })}
              />
              <InputField
                label="Your Email"
                placeholder="Enter your email address"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Contact Number"
                placeholder="Enter your contact number"
                value={form.contact_number}
                onChangeText={(value) =>
                  setForm({ ...form, contact_number: value })
                }
              />
              <InputField
                label="Alternative Number"
                placeholder="Enter an alternative number"
                value={form.alt_number}
                onChangeText={(value) =>
                  setForm({ ...form, alt_number: value })
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

export default profiledata;
