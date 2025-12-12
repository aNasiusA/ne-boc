import { Theme } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

const BackButton = ({ style }: { style?: ViewStyle }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <Ionicons
        name="chevron-back"
        size={24}
        color={Theme.colors.text.primary}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});
