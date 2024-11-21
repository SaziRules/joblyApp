import { icons, images } from "@/constants";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import "firebase/firestore";
import { collection, addDoc, CollectionReference } from "firebase/firestore";

const Resume = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]); // Initialize skills state
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthday: "",
    location: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    workHistory: "",
    references: "",
    skill: "",
    certification: "",
    language: "",
    linkedin: "",
  });

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

  const handleSkillChange = (text: string) => {
    setSkillInput(text);
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const selectGender = (gender: string) => {
    setForm({ ...form, gender });
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
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <View className="mb-3 mt-2">
                <Text className="text-lg font-JakartaSemiBold mb-3">
                  Gender
                </Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className={`flex-1 py-4 px-3 bg-neutral-100 rounded-full items-center mx-2 ${
                      form.gender === "Male" ? "bg-[#FEC300]" : ""
                    }`}
                    onPress={() => selectGender("Male")}
                  >
                    <Text
                      className={`text-lg font-Jakarta ${
                        form.gender === "Male" ? "text-white" : "text-gray-400"
                      }`}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-4 px-3 bg-neutral-100 rounded-full items-center mx-2 ${
                      form.gender === "Female" ? "bg-[#FEC300]" : ""
                    }`}
                    onPress={() => selectGender("Female")}
                  >
                    <Text
                      className={`text-lg font-Jakarta ${
                        form.gender === "Female"
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <InputField
                label="Date Of Birth"
                placeholder="Enter your date of birth"
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
                label="Location"
                placeholder="Enter your physical address"
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
                label="Email"
                placeholder="Enter your email address"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Phone Number"
                placeholder="Enter your contact number"
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
                title="Previous"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => setStep(step - 1)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <InputField
                label="Education"
                placeholder="Enter your education details"
                value={form.education}
                onChangeText={(value) => setForm({ ...form, education: value })}
              />
              <InputField
                label="Work History"
                placeholder="Enter your work experience"
                value={form.workHistory}
                onChangeText={(value) =>
                  setForm({ ...form, workHistory: value })
                }
              />
              <InputField
                label="Skills"
                placeholder="Enter your skills seperated by a (,) comma"
                value={form.skill}
                onChangeText={(value) => setForm({ ...form, skill: value })}
              />
              <InputField
                label="Certification"
                placeholder="Enter your acquired certifications"
                value={form.certification}
                onChangeText={(value) =>
                  setForm({ ...form, certification: value })
                }
              />

              <CustomButton
                title="Next"
                className="mt-6"
                onPress={() => setStep(step + 1)}
              />
              <CustomButton
                title="Previous"
                className="mt-6 bg-[#2e2e2e]"
                onPress={() => setStep(step - 1)}
              />
            </>
          )}

          {step === 4 && (
            <>
              <InputField
                label="References"
                placeholder="Enter your references"
                value={form.references}
                onChangeText={(value) =>
                  setForm({ ...form, references: value })
                }
              />
              <InputField
                label="Languages"
                placeholder="Enter your languages"
                value={form.language}
                onChangeText={(value) => setForm({ ...form, language: value })}
              />
              <InputField
                label="LinkedIn Profile"
                placeholder="Enter your linkedin profile link"
                value={form.linkedin}
                onChangeText={(value) => setForm({ ...form, linkedin: value })}
              />

              <CustomButton
                title="Submit"
                className="mt-6"
                onPress={() => Alert.alert("Resume submitted successfully!")}
              />
              <CustomButton
                title="Previous"
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

export default Resume;
