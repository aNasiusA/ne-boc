import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme } from "../constants/colors";

interface LocationDropdownProps {
  onPress?: () => void;
}

const LocationDropdown = ({ onPress }: LocationDropdownProps) => {
  const [location, setLocation] = useState<string>("Getting location...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLocation("Location access denied");
        return;
      }

      try {
        let locationData = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        if (address.length > 0) {
          const { city, region, district } = address[0];
          // Format as "Area, City" or fallback to available data
          const locationString =
            district && city
              ? `${district}, ${city}`
              : city && region
              ? `${city}, ${region}`
              : city || region || "Unknown location";
          setLocation(locationString);
        } else {
          setLocation("Location not found");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLocation("Unable to get location");
      }
    })();
  }, []);

  const handlePress = () => {
    if (errorMsg) {
      Alert.alert("Location Error", errorMsg);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name="location-on"
        size={20}
        color={Theme.colors.ui.primary}
        style={styles.icon}
      />
      <Text style={styles.locationText} numberOfLines={1}>
        {location}
      </Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={20}
        color={Theme.colors.text.secondary}
      />
    </TouchableOpacity>
  );
};

export default LocationDropdown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.ui.background,
    borderRadius: 25, // Pill shape
    paddingHorizontal: 16,
    paddingVertical: 8,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
    borderWidth: 1,
    borderColor: Theme.colors.ui.surface,
  },
  icon: {
    marginRight: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text.primary,
    fontWeight: "500",
    maxWidth: 150, // Limit width to prevent squishing other items
  },
});
