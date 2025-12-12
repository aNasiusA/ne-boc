import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Theme } from "../constants/colors";

interface NotificationIconProps {
  size?: number;
  color?: string;
  hasUnread?: boolean;
}

const NotificationIcon = ({
  size = 24,
  color = Theme.colors.text.primary,
  hasUnread = false,
}: NotificationIconProps) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/notification")}
      style={styles.container}
    >
      <MaterialIcons
        name={hasUnread ? "notifications" : "notifications-none"}
        size={size}
        color={color}
      />
      {hasUnread && <View style={styles.badge} />}
    </Pressable>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.ui.primary,
  },
});
