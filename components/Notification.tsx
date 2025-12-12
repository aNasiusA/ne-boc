import Colors from "@/constants/colors";
import { Image, StyleSheet, Text, View } from "react-native";

// 1. Updated Interface to include an optional avatar for that authentic feel
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  avatarUrl?: string; // Optional: URL for the user's profile pic
}

interface NotificationProps {
  item: NotificationItem;
}

const Notification = ({ item }: NotificationProps) => {
  return (
    <View style={[styles.container, !item.read && styles.unread]}>
      {/* Left Side: Avatar */}
      <View style={styles.leftColumn}>
        {item.avatarUrl ? (
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
        ) : (
          // Placeholder if no image provided
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}
      </View>

      {/* Right Side: Content */}
      <View style={styles.rightColumn}>
        <View style={styles.headerRow}>
          {/* Title usually contains the Name */}
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* The actual tweet/message content */}
        <Text style={styles.message} numberOfLines={3}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Horizontal layout
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth, // Thin minimalist border
    borderBottomColor: Colors.silver, // Standard light gray border
    backgroundColor: Colors.surface, // Default to white
  },
  unread: {
    // Twitter uses a very subtle blue for unread items
    backgroundColor: Colors.rgba.primary(0.08),
  },
  leftColumn: {
    marginRight: 12,
  },
  rightColumn: {
    flex: 1, // Takes up remaining space
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
  },
  avatarPlaceholder: {
    backgroundColor: Colors.textLight,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 4,
  },
  dot: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginHorizontal: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  message: {
    fontSize: 15,
    color: Colors.textSecondary, // Twitter messages are usually dark gray, not black
    lineHeight: 20,
  },
});
