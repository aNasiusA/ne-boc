import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import config files to seed async storage
import "@/config/items";
import "@/config/notifications";
import "@/config/posts";
import "@/config/priceReport";
import "@/config/settings";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SafeAreaProvider>
  );
}
