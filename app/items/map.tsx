import BackButton from "@/components/BackButton";
import { PriceReport } from "@/components/PriceReportCard";
import Colors, { Theme } from "@/constants/colors";
import { getItem } from "@/utils/asyncStorage";
import { useLocalSearchParams } from "expo-router";
import { ChevronLeft, MapPinned, Navigation, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Linking,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapPage() {
  const { id } = useLocalSearchParams();
  const [reports, setReports] = useState<PriceReport[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    fetchReports();
  }, [id]);

  const fetchReports = async () => {
    try {
      const storedReports = await getItem("priceReports");
      if (storedReports) {
        const parsed = JSON.parse(storedReports);
        const filtered = parsed
          .filter((r: any) => r.itemId === id && r.location.coordinates)
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

  const points = reports.map((report) => ({
    latitude: report.location.coordinates!.lat,
    longitude: report.location.coordinates!.long,
    weight: 1,
  }));

  const uniqueLocations = Array.from(
    new Set(reports.map((r) => r.location.market))
  ).map((market) => {
    const report = reports.find((r) => r.location.market === market);
    return { market, coordinates: report!.location.coordinates! };
  });

  const handleNavigate = (lat: number, long: number, label: string) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${long}`;
    const labelEncoded = encodeURIComponent(label);
    const url = Platform.select({
      ios: `${scheme}${labelEncoded}@${latLng}`,
      android: `${scheme}${latLng}(${labelEncoded})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const selectedMarketReports = selectedMarket
    ? reports.filter((r) => r.location.market === selectedMarket)
    : [];

  const selectedMarketLocation = selectedMarket
    ? uniqueLocations.find((l) => l.market === selectedMarket)
    : null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {points.length > 0 ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: points[0].latitude,
            longitude: points[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation
          showsCompass={false}
        >
          {points.map((point, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              pinColor={Theme.colors.ui.primary}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.noDataContainer}>
          <MapPinned size={64} color={Colors.textLight} />
          <Text style={styles.noDataText}>No location data available</Text>
        </View>
      )}

      <BackButton style={styles.backButton} />

      {points.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
            <View style={styles.locationIconContainer}>
              <MapPinned size={24} color={Colors.white} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Explore Markets</Text>
              <Text style={styles.locationSubLabel}>
                {uniqueLocations.length}{" "}
                {uniqueLocations.length === 1 ? "location" : "locations"}{" "}
                available
              </Text>
            </View>
            <View style={styles.arrowContainer}>
              <Navigation
                size={20}
                color={Theme.colors.ui.primary}
                fill={Theme.colors.ui.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          if (selectedMarket) {
            setSelectedMarket(null);
          } else {
            setModalVisible(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            {selectedMarket ? (
              <View>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setSelectedMarket(null)}
                    style={styles.closeIconButton}
                  >
                    <ChevronLeft size={24} color={Colors.text} />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{selectedMarket}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeIconButton}
                  >
                    <X size={24} color={Colors.text} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.reportsList}>
                  {selectedMarketReports.map((report, index) => (
                    <View key={index} style={styles.reportItem}>
                      <View>
                        <Text style={styles.reportPrice}>
                          GH₵ {report.price.toFixed(2)}
                        </Text>
                        <Text style={styles.reportDate}>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text style={styles.reportUser}>
                        by {report.user.username}
                      </Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.navigateButton}
                    onPress={() => {
                      if (selectedMarketLocation) {
                        handleNavigate(
                          selectedMarketLocation.coordinates.lat,
                          selectedMarketLocation.coordinates.long,
                          selectedMarket
                        );
                      }
                    }}
                  >
                    <Navigation size={20} color={Colors.white} />
                    <Text style={styles.navigateButtonText}>
                      Navigate to Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.modalHeader}>
                  <View style={{ width: 24 }} />
                  <Text style={styles.modalTitle}>Select Location</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeIconButton}
                  >
                    <X size={24} color={Colors.text} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.locationsList}>
                  {uniqueLocations.map((loc, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.locationItem}
                      onPress={() => {
                        setSelectedMarket(loc.market);
                        mapRef.current?.animateToRegion({
                          latitude: loc.coordinates.lat,
                          longitude: loc.coordinates.long,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        });
                      }}
                    >
                      <View style={styles.locationItemIcon}>
                        <MapPinned size={20} color={Colors.textSecondary} />
                      </View>
                      <Text style={styles.locationText}>{loc.market}</Text>
                      <Navigation size={16} color={Colors.textLight} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  locationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.ui.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  locationSubLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  arrowContainer: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  closeIconButton: {
    padding: 4,
  },
  locationsList: {
    padding: 20,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  locationItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  reportsList: {
    padding: 20,
  },
  reportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  reportPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  reportDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reportUser: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  actionContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.surface,
  },
  navigateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.ui.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: Theme.colors.ui.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  navigateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
