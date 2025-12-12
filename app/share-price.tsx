import { Item } from "@/config/items";
import Colors from "@/constants/colors";
import { getItem, setItem } from "@/utils/asyncStorage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  HeartHandshake,
  MapPin,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const SharePrice = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Getting location...");
  const [locationSub, setLocationSub] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const categories = Array.from(new Set(items.map((item) => item.category)));

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await getItem("items");
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setItems(parsedItems);
      if (parsedItems.length > 0 && !selectedCategory) {
        setSelectedCategory(parsedItems[0].category);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    const newFiltered = items.filter(
      (item) => item.category === selectedCategory
    );
    setFilteredItems(newFiltered);
    if (selectedItem && !newFiltered.find((i) => i.id === selectedItem.id)) {
      setSelectedItem(null);
    }
  }, [selectedCategory, items, selectedItem]);

  const refreshLocation = async () => {
    try {
      let locationData = await Location.getCurrentPositionAsync({});
      setLatitude(locationData.coords.latitude);
      setLongitude(locationData.coords.longitude);
      let address = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (address.length > 0) {
        const { city, region, district, name } = address[0];
        setLocationName(name || district || city || "Unknown location");
        setLocationSub(
          `${city ? city + ", " : ""}${region || ""}`.trim().replace(/,$/, "")
        );
      } else {
        setLocationName("Location not found");
        setLocationSub("");
      }
    } catch (error) {
      console.error("Error refreshing location:", error);
      setLocationName("Unable to refresh location");
      setLocationSub("");
    }
  };

  // Logic placeholders
  const pickImage = async () => {
    // ... (Keep your existing logic here)
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!selectedItem || !price || !latitude || !longitude) {
      // Basic validation
      alert(
        "Please select an item, fill in price, and ensure location is available."
      );
      return;
    }

    const newReport = {
      id: `rep_${Date.now()}`, // Unique id
      itemId: selectedItem.id,
      price: parseFloat(price),
      location: {
        market: locationName,
        coordinates: { lat: latitude, long: longitude },
      },
      picture: photo || undefined,
      user: {
        username: "Anonymous User",
        profilePicture: "https://i.pravatar.cc/100?img=0",
      },
      createdAt: new Date().toISOString(),
    };

    // Load current priceReports
    const stored = await getItem("priceReports");
    let reports = stored ? JSON.parse(stored) : [];

    // Append new report
    reports.unshift(newReport); // Add to top

    // Save
    await setItem("priceReports", JSON.stringify(reports));

    // Navigate back
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.textMain} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a Price</Text>
        <TouchableOpacity>
          <Text style={styles.skipText}>{"‎ "}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        extraHeight={120}
      >
        {/* Photo Upload Section */}
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <View style={styles.cameraIconCircle}>
                <Camera size={24} color={Colors.textSub} />
              </View>
              <Text style={styles.photoMainText}>Add Photo (Optional)</Text>
              <Text style={styles.photoSubText}>
                Snap a photo of the item or receipt
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Select Item Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Item</Text>

          {/* Category Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.chipActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Items List */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.itemsContainer}
          >
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemChip,
                  selectedItem?.id === item.id && styles.itemChipActive,
                ]}
                onPress={() => setSelectedItem(item)}
              >
                <Text
                  style={[
                    styles.itemChipText,
                    selectedItem?.id === item.id && styles.itemChipTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>₵</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Location</Text>
            <TouchableOpacity onPress={refreshLocation}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Location Card */}
          <View style={styles.locationCard}>
            <View style={styles.mapThumbnail}>
              {/* Placeholder for map image - using icon for now */}
              <MapPin size={20} color={Colors.primary} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{locationName}</Text>
              <Text style={styles.locationSub}>{locationSub}</Text>
            </View>
            <CheckCircle2
              size={20}
              color={Colors.success}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={styles.additionalInput}
            placeholder="Any additional information..."
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Report Price</Text>
          </TouchableOpacity>

          <View style={styles.impactRow}>
            {/* You can use an Icon here instead of emoji */}
            <HeartHandshake
              size={16}
              color="#15803D"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.impactText}>
              Your post helps 1000+ people today
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textMain,
  },
  skipText: {
    color: Colors.textSub,
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Photo Styles
  photoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.platinum, // Dashed border simulated
    borderStyle: "dashed",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  photoPlaceholder: {
    alignItems: "center",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  cameraIconCircle: {
    backgroundColor: Colors.platinum,
    padding: 12,
    borderRadius: 30,
    marginBottom: 12,
  },
  photoMainText: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.textMain,
    marginBottom: 4,
  },
  photoSubText: {
    color: Colors.textSub,
    fontSize: 13,
  },

  // Section Styles
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textMain,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  editText: {
    color: Colors.textSub,
    fontWeight: "600",
  },

  // Inputs
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 30, // Fully rounded
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textMain,
  },

  // Chips
  chipsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  chip: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontWeight: "600",
    color: Colors.textMain,
  },
  chipTextActive: {
    color: Colors.white,
  },

  // Items
  itemsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  itemChip: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  itemChipText: {
    fontWeight: "600",
    color: Colors.textMain,
  },
  itemChipTextActive: {
    color: Colors.white,
  },

  // Price Input
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 25,
    height: 60,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textMain,
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textMain, // Matches the grey 0.00
  },

  // Location Card
  locationCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  mapThumbnail: {
    width: 50,
    height: 50,
    backgroundColor: Colors.platinum, // Placeholder for map image
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.textMain,
  },
  locationSub: {
    color: Colors.textSub,
    fontSize: 12,
    marginTop: 2,
  },

  // Footer / Details
  footer: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  impactText: {
    color: Colors.successDark, // Greenish
    fontSize: 12,
    fontWeight: "600",
  },
  additionalInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textMain,
    textAlignVertical: "top",
    height: 100,
  },
});

export default SharePrice;
