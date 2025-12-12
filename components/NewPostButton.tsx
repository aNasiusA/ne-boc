import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";

const NewPostButton = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/share-price")}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};
export default NewPostButton;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 15,
  },
});
