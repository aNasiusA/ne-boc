import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../constants/colors";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
}

const SearchBar = ({
  placeholder = "Search for Items you want to buy...",
  value = "",
  onChangeText,
  onClear,
}: SearchBarProps) => {
  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleClear = () => {
    if (onChangeText) {
      onChangeText("");
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="search"
        size={24}
        color={Theme.colors.text.secondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.text.secondary}
        value={value}
        onChangeText={handleTextChange}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <MaterialIcons
            name="clear"
            size={24}
            color={Theme.colors.text.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.ui.background,
    borderRadius: 25, // Pill shape
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: Theme.colors.text.primary,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 2,
  },
});
