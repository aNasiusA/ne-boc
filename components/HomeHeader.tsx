import { StyleSheet, View } from "react-native";
import LocationDropdown from "./LocationDropdown";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <ProfileIcon />
      <LocationDropdown />
      <NotificationIcon />
    </View>
  );
};
export default HomeHeader;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    paddingTop: 0, // Remove top padding since SafeAreaView handles it
  },
});
