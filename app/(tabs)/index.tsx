import HomeHeader from "@/components/HomeHeader";
import LoadingScreen from "@/components/LoadingScreen";
import NewPostButton from "@/components/NewPostButton";
import PriceReportCard from "@/components/PriceReportCard";
import { Items } from "@/config/items";
import { PriceReports } from "@/config/priceReport";
import Colors, { Theme } from "@/constants/colors";
import { getItem, setItem } from "@/utils/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [priceReports, setPriceReports] = useState(PriceReports);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [trendingIndex, setTrendingIndex] = useState(0);

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

  const categories = useMemo(() => {
    const cats = new Set(Items.map((i) => i.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const trendingMessages = [
    "🔥 Tomato prices dropped 15% at Kaneshie",
    "⚠️ New fuel price change update",
    "📈 Rice prices rising this week",
    "💰 Best deals on vegetables today",
    "📊 Market trends: Fruits up 8%",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % trendingMessages.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [trendingMessages.length]);

  const filteredReports = useMemo(() => {
    return priceReports.filter((report) => {
      const item = Items.find((i) => i.id === report.itemId);
      const itemName = item?.name.toLowerCase() || "";
      const marketName = report.location.market.toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        itemName.includes(query) || marketName.includes(query);
      const matchesCategory =
        selectedCategory === "All" ||
        !selectedCategory ||
        item?.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [priceReports, searchQuery, selectedCategory]);

  if (loading) return <LoadingScreen />;

  const renderHeader = () => (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              (selectedCategory === cat ||
                (cat === "All" && !selectedCategory)) &&
                styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(cat === "All" ? null : cat)}
          >
            <Text
              style={[
                styles.categoryText,
                (selectedCategory === cat ||
                  (cat === "All" && !selectedCategory)) &&
                  styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.trendingBanner}>
        <Text style={styles.trendingText}>
          {trendingMessages[trendingIndex]}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Updates</Text>
    </View>
  );

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
          data={filteredReports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PriceReportCard report={item} />}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No reports found</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 80 }}
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.ui.surface,
    borderWidth: 1,
    borderColor: Theme.colors.ui.border,
  },
  categoryChipActive: {
    backgroundColor: Theme.colors.ui.primary,
    borderColor: Theme.colors.ui.primary,
  },
  categoryText: {
    color: Theme.colors.text.secondary,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: Theme.colors.text.inverse,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.text.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trendingBanner: {
    backgroundColor: Theme.colors.ui.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  trendingText: {
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    color: Theme.colors.text.secondary,
    fontSize: 16,
  },
});
