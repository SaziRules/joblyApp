import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void; // Explicitly define the type for onClose
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center shadow-2xl">
        <View className="bg-white rounded-lg p-5 w-3/4">
          <Text className="text-lg font-bold mb-4">Payment Required</Text>
          <Text className="text-sm text-gray-700 mb-4">
            Please complete the payment to proceed.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-blue-500 rounded p-3"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
