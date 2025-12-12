import BackButton from "@/components/BackButton";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import { Items } from "@/config/items";
import Colors, { Theme } from "@/constants/colors";
import { getItem } from "@/utils/asyncStorage";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { MapPinned } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PriceReport {
  id: string;
  itemId: string;
  price: number;
  location: {
    market: string;
    coordinates?: { lat: number; long: number };
  };
  picture?: string;
  user: {
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

export default function ItemDetails() {
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [reports, setReports] = useState<PriceReport[]>([]);

  useEffect(() => {
    fetchReports();
  }, [id]);

  const fetchReports = async () => {
    try {
      const storedReports = await getItem("priceReports");
      if (storedReports) {
        const parsed = JSON.parse(storedReports);
        const filtered = parsed
          .filter((r: any) => r.itemId === id)
          .sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        setReports(filtered);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports().then(() => setRefreshing(false));
  };

  const item = Items.find((i) => i.id === id);

  const priceHistory = reports.map((r) => ({
    date: r.createdAt,
    price: r.price,
  }));

  // Calculate Nokware Index
  let nokwareIndex = 0;
  let VAR = 0;
  let VCA = 0;
  let RF = 0;
  let LDF = 0;
  if (reports.length > 0) {
    // VAR: Validator agreement ratio - % of reports within 10% of average price
    const prices = reports.map((r) => r.price);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const agreedCount = prices.filter(
      (p) => Math.abs(p - avgPrice) / avgPrice < 0.1
    ).length;
    VAR = agreedCount / reports.length;

    // VCA: Validator credibility average - assuming average credibility of 0.8
    VCA = 0.8;

    // RF: Report freshness - fixed at 0.95 for now (assuming recent reports)
    RF = 0.95;

    // LDF: Location density factor - based on unique markets
    const uniqueMarkets = new Set(reports.map((r) => r.location.market)).size;
    LDF = Math.min(uniqueMarkets / 3, 1);

    nokwareIndex = VAR * VCA * RF * LDF;
  }

  if (!item) return <Text>Item not found</Text>;
  // Use a more accessible color property for the text color, e.g., 'good' or 'bad'
  const niColor = nokwareIndex > 0.6 ? Colors.success : Colors.primary; // Green or Red

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Back Button - Positioned absolutely over the screen */}
      <BackButton style={styles.backButton} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Item image - Now inside the ScrollView */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.pictures?.[0] ?? "https://via.placeholder.com/150",
            }}
            style={styles.image}
            contentFit="cover"
            placeholder="https://via.placeholder.com/150"
          />
        </View>
        {/* Item name & category */}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>

        {reports.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price History</Text>
            {/* Remove horizontal margin hack by using padding on scrollContent */}
            <PriceHistoryChart data={priceHistory} />
          </View>
        )}

        {/* Price Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Statistics</Text>

          {/* Explanations */}
          <View style={styles.explanationsContainer}>
            <Text style={styles.explanation}>
              • <Text style={styles.acronym}>VAR</Text>: Validator agreement
              ratio - % of reports within 10% of average price
            </Text>
            <Text style={styles.explanation}>
              • <Text style={styles.acronym}>VCA</Text>: Validator credibility
              average - avg. credibility score of validators
            </Text>
            <Text style={styles.explanation}>
              • <Text style={styles.acronym}>RF</Text>: Report freshness -
              penalty for old data
            </Text>
            <Text style={styles.explanation}>
              • <Text style={styles.acronym}>LDF</Text>: Location density factor
              - adjusts when few validators exist nearby
            </Text>
          </View>

          {/* Calculation Formula */}
          <View style={styles.calculationContainer}>
            <View style={styles.calcItem}>
              <Text style={styles.calcLabel}>VAR</Text>
              <Text style={styles.calcValue}>{VAR.toFixed(2)}</Text>
            </View>
            <Text style={styles.operator}>×</Text>
            <View style={styles.calcItem}>
              <Text style={styles.calcLabel}>VCA</Text>
              <Text style={styles.calcValue}>{VCA.toFixed(2)}</Text>
            </View>
            <Text style={styles.operator}>×</Text>
            <View style={styles.calcItem}>
              <Text style={styles.calcLabel}>RF</Text>
              <Text style={styles.calcValue}>{RF.toFixed(2)}</Text>
            </View>
            <Text style={styles.operator}>×</Text>
            <View style={styles.calcItem}>
              <Text style={styles.calcLabel}>LDF</Text>
              <Text style={styles.calcValue}>{LDF.toFixed(2)}</Text>
            </View>
            <Text style={styles.operator}>=</Text>
            <View style={styles.calcItem}>
              <Text style={styles.calcLabel}>NI</Text>
              <Text style={[styles.calcValue, { color: niColor }]}>
                {nokwareIndex.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed footer for Nokware Index */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.indexInfo}>
            {reports.length === 0 ? (
              <Text style={styles.noReports}>No reports yet</Text>
            ) : (
              <>
                <Text style={styles.indexLabel}>NOKWARE INDEX</Text>
                <View style={styles.scoreContainer}>
                  <Text style={[styles.indexValue, { color: niColor }]}>
                    {nokwareIndex.toFixed(2)}
                  </Text>
                  <Text style={styles.indexScale}>/ 1.0</Text>
                </View>
                <Text style={styles.reportCount}>
                  Based on {reports.length}{" "}
                  {reports.length === 1 ? "report" : "reports"}
                </Text>
              </>
            )}
          </View>

          {reports.length > 0 && (
            <Link href={`/items/map?id=${id}`} asChild>
              <TouchableOpacity style={styles.mapButton}>
                <MapPinned
                  size={20}
                  color={Theme.colors.ui.primary}
                  style={styles.icon}
                />
                <Text style={styles.mapButtonText}>Map</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.background },
  // Add horizontal padding here. Add extra bottom padding for the fixed footer.
  scrollContent: { paddingHorizontal: 16, paddingBottom: 100 },

  // Image container now only holds the image and has top spacing
  imageContainer: {
    marginTop: 10,
    marginBottom: 16, // Space below the image before the title
    overflow: "hidden", // Ensures borderRadius works
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },

  // Back button positioned absolutely relative to the main container
  backButton: {
    position: "absolute",
    top: 50, // Adjust this based on your SafeAreaView usage and header height
    left: 16, // Match horizontal padding
    zIndex: 10, // Ensure it's above the image
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  name: {
    fontSize: 24, // Slightly larger
    fontWeight: "700",
    color: Colors.text,
  },
  category: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 20, // Add more space after category
  },
  section: {
    marginTop: 10,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8, // Space below the title before the chart
    color: Colors.text,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indexInfo: {
    flex: 1,
    justifyContent: "center",
  },
  noReports: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  indexLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  indexValue: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 32,
  },
  indexScale: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textLight,
    marginLeft: 4,
  },
  reportCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  explanationsContainer: {
    marginBottom: 16,
  },
  explanation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  acronym: {
    fontWeight: "600",
    color: Colors.text,
  },
  calculationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  calcItem: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  calcLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textLight,
    marginBottom: 2,
  },
  calcValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  operator: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textLight,
    marginHorizontal: 8,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.ui.background,
    borderWidth: 1,
    borderColor: Theme.colors.ui.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: 16,
  },
  icon: {
    marginRight: 6,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text.primary,
  },
});
