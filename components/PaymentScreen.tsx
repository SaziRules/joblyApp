import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { CardField } from "@stripe/stripe-react-native";

interface PaymentScreenProps {
  onPaymentSuccess: () => void; // Define the type for onPaymentSuccess
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onPaymentSuccess }) => {
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePayPress = async () => {
    // Mocked successful payment response
    console.log("Payment successful");
    setPaymentSuccessful(true);

    // Wait for 3 seconds before calling onPaymentSuccess to close the modal
    setTimeout(() => {
      onPaymentSuccess();
    }, 3000);
  };

  return (
    <View style={{ padding: 5 }}>
      {isPaymentSuccessful ? (
        <Text style={{ fontSize: 16, color: "green", marginBottom: 20 }}>
          Payment successful! redirecting to candidate profile.
        </Text>
      ) : (
        <>
          <CardField
            postalCodeEnabled={true}
            placeholders={{ number: "4242 4242 4242 4242" }}
            cardStyle={{
              backgroundColor: "#f2f2f2",
              textColor: "#4d4d4d",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
          />
          <Button title="Pay" onPress={handlePayPress} />
        </>
      )}
    </View>
  );
};

export default PaymentScreen;
