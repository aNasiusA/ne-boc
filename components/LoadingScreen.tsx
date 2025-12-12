import Lottie from "lottie-react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Theme } from "../constants/colors";
const { width, height } = Dimensions.get("window");

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require("@/assets/animations/loading.json")}
        autoPlay
        style={styles.lottie}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
export default LoadingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.ui.background,
  },
  lottie: { width: width * 0.9, height: width },

  text: {
    marginTop: 20,
    fontSize: 18,
    color: Theme.colors.text.primary,
    fontWeight: "bold",
  },
});
