import { Theme } from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileIcon from "./ProfileIcon";

const UserCard = () => {
  return (
    <View style={styles.container}>
      {/* FIRST ROW: Icon + username */}
      <View style={styles.topRow}>
        <ProfileIcon size={60} />

        <View style={styles.userInfo}>
          <Text style={styles.username}>aNasiusA</Text>
          <Text style={styles.handle}>@kasserteea</Text>
        </View>
      </View>

      {/* SECOND ROW: Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.ui.surface,
    padding: 16,
    borderRadius: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  userInfo: {
    marginLeft: 12,
  },

  username: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.text.primary,
  },

  handle: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    backgroundColor: Theme.colors.ui.primary,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: Theme.colors.text.inverse,
    fontWeight: "600",
  },
});
