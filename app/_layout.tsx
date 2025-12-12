import { Stack } from "expo-router";

// Import config files to seed async storage
import "@/config/items";
import "@/config/notifications";
import "@/config/posts";
import "@/config/priceReport";
import "@/config/settings";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
