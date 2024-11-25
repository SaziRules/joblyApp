import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import PaymentScreen from "./PaymentScreen"; // Import PaymentScreen component
import { router } from "expo-router";

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void; // Explicitly define the type for onClose
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose }) => {
  const handlePaymentSuccess = () => {
    onClose(); // Close modal on payment success
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center shadow-2xl">
        <View className="bg-white rounded-lg p-5 w-3/4">
          <Text className="text-lg font-JakartaBold mb-4">
            Payment Required
          </Text>
          <PaymentScreen onPaymentSuccess={handlePaymentSuccess} />
          <TouchableOpacity
            onPress={onClose}
            className="bg-[#FEC300] p-3 mt-4 rounded-full"
          >
            <Text className="text-white text-m text-center font-JakartaBold">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
