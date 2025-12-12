import HomeHeader from "@/components/HomeHeader";
import LoadingScreen from "@/components/LoadingScreen";
import NewPostButton from "@/components/NewPostButton";
import PriceReportCard from "@/components/PriceReportCard";
import { PriceReports } from "@/config/priceReport";
import Colors from "@/constants/colors";
import { getItem, removeItem, setItem } from "@/utils/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [priceReports, setPriceReports] = useState(PriceReports);
  const [refreshing, setRefreshing] = useState(false);

  const loadPriceReports = async () => {
    const stored = await getItem("priceReports");
    if (stored) {
      setPriceReports(JSON.parse(stored));
    } else {
      setPriceReports(PriceReports);
      await setItem("priceReports", JSON.stringify(PriceReports));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPriceReports();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadPriceReports();
    }, [])
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await getItem("hasOnboarded");
      if (onboarded === "true") {
        setLoading(false);
      } else {
        router.replace("/onboarding");
      }
    };
    checkOnboarding();
  }, [router]);

  if (loading) return <LoadingScreen />;

  const handleReset = async () => {
    await removeItem("hasOnboarded");
    router.replace("/onboarding");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <HomeHeader />
      <View style={styles.content}>
        <FlatList
          data={priceReports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PriceReportCard report={item} />}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <NewPostButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
