import AuthLink from "@/components/AuthLinks";
import BackButton from "@/components/BackButton";
import SettingsLink from "@/components/SettingsLink";
import SupportLink from "@/components/SupportLink";
import UserCard from "@/components/UserCard";
import { Auth, Settings, Support } from "@/config/settings";
import Colors from "@/constants/colors";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <BackButton style={styles.back} />
          <Text style={styles.title}>Your Account</Text>
        </View>
        <View style={{ padding: 16 }}>
          <UserCard />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <FlatList
            data={Settings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SettingsLink item={item} />}
            scrollEnabled={false}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Support</Text>
          <FlatList
            data={Support}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SupportLink item={item} />}
            scrollEnabled={false}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Auth</Text>
          <FlatList
            data={Auth}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AuthLink item={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: "relative",
  },
  back: {
    position: "absolute",
    left: 8,
  },
  title: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
