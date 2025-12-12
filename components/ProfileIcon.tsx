import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/colors";

interface ProfileIconProps {
  size?: number;
  profilePicture?: string;
  fallbackColor?: string;
}

const ProfileIcon = ({
  size = 40,
  profilePicture,
  fallbackColor = Theme.colors.ui.primary,
}: ProfileIconProps) => {
  const router = useRouter();
  const iconSize = size * 0.6; // Icon should be smaller than the container

  const handlePress = () => {
    router.push("/profile");
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: size, height: size }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {profilePicture ? (
        <Image
          source={{ uri: profilePicture }}
          style={styles.profileImage}
          contentFit="cover"
        />
      ) : (
        <MaterialIcons name="person" size={iconSize} color={fallbackColor} />
      )}
    </TouchableOpacity>
  );
};

export default ProfileIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: Theme.colors.ui.surface,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
