import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="privacy" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
