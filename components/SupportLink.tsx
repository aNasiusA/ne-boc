import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SettingItem {
  id: string;
  name: string;
  link: string;
}

const SupportLink = ({ item }: { item: SettingItem }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <Ionicons name="chevron-up" size={24} color="gray" />
    </TouchableOpacity>
  );
};
export default SupportLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    // borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 16,
  },
});
