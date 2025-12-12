import {
  Bookmark,
  CheckCircle,
  MessageCircle,
  Share,
} from "lucide-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileIcon from "./ProfileIcon";

interface Post {
  user: {
    profilePicture: string;
    username: string;
    handle: string;
    isVerified?: boolean;
  };
  item: {
    name: string;
    price: Number;
    location: { coordinates: { long: Number; lat: Number }; market?: string };
    picture?: string;
  };
  content?: string;
  createdAt: string;
}

const actions = [
  { name: "confirm", icon: CheckCircle },
  { name: "comment", icon: MessageCircle },
  { name: "save", icon: Bookmark },
  { name: "share", icon: Share },
];

const PostCard = ({ post }: { post: Post }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ProfileIcon profilePicture={post.user.profilePicture} />
        <View style={styles.headerText}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>{post.user.username}</Text>
            {post.user.isVerified && (
              <CheckCircle
                size={16}
                color="#1DA1F2"
                style={styles.verifiedIcon}
              />
            )}
            <Text style={styles.handle}>@{post.user.handle}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.time}>{post.createdAt}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.itemName}>{post.item.name}</Text>
        <View style={styles.priceLocationRow}>
          <Text style={styles.price}>${post.item.price.toString()}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.location}>
            {post.item.location.market || "Location"}
          </Text>
        </View>
        {post.item.picture && (
          <Image source={{ uri: post.item.picture }} style={styles.image} />
        )}
      </View>

      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.name}
            onPress={() => console.log(action.name)}
            style={styles.actionButton}
          >
            <action.icon size={18} color="#536471" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF3F4",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 4,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "700",
    fontSize: 15,
    color: "#0F1419",
  },
  verifiedIcon: {
    marginLeft: 2,
  },
  handle: {
    color: "#536471",
    fontSize: 15,
    marginLeft: 4,
  },
  dot: {
    color: "#536471",
    marginHorizontal: 4,
    fontSize: 15,
  },
  time: {
    color: "#536471",
    fontSize: 15,
  },
  content: {
    marginLeft: 52,
  },
  itemName: {
    fontSize: 15,
    color: "#0F1419",
    lineHeight: 20,
    marginBottom: 4,
  },
  priceLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#00BA7C",
  },
  location: {
    fontSize: 15,
    color: "#536471",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 16,
    backgroundColor: "#F7F9F9",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginLeft: 52,
    paddingRight: 40,
  },
  actionButton: {
    padding: 8,
  },
});
