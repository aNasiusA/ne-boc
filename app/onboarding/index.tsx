import { Colors, Theme } from "@/constants/colors";
import { setItem } from "@/utils/asyncStorage";
import { useRouter } from "expo-router";
import Lottie from "lottie-react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const handleDone = async () => {
    await setItem("hasOnboarded", "true");
    router.replace("/(tabs)");
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        showSkip={false}
        containerStyles={{ paddingHorizontal: 15, paddingBottom: 30 }}
        pages={[
          {
            backgroundColor: Theme.colors.brand.fieryTerracotta,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("@/assets/animations/Money.json")}
                  autoPlay
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title:
              "Everything is expensive.\nBut some places are cheaper than others.",
            subtitle:
              "Get real, crowdsourced prices from people around you — instantly.",
          },
          {
            backgroundColor: Theme.colors.brand.jetBlack,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("@/assets/animations/Map.json")}
                  autoPlay
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "Find the best prices near you",
            subtitle:
              "Ne boɔ shows prices shared by real users and highlights where you can buy cheaper — right now, at your location.",
          },
          {
            backgroundColor: Theme.colors.brand.blueSlate,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("@/assets/animations/Step.json")}
                  autoPlay
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "Simple. Crowdsourced. Accurate.",
            subtitle:
              "• Search for an item\n\n• See prices from nearby shops\n\n• Add the price you find to help others",
          },
          {
            backgroundColor: Theme.colors.brand.platinum,
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("@/assets/animations/Community.json")}
                  autoPlay
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ),
            title: "We save together",
            subtitle:
              "Every price you share helps someone else avoid overpaying. Together, we make the city more affordable.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  lottie: { width: width * 0.9, height: width },
});
