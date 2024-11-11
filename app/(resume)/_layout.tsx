import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="personal-details" options={{ headerShown: false }} />
      <Stack.Screen name="education" options={{ headerShown: false }} />
      <Stack.Screen name="work-experience" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
