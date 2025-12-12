import HomeHeader from "@/components/HomeHeader";
import ItemCard from "@/components/ItemCard";
import SearchBar from "@/components/SearchBar";
import { Items } from "@/config/items";
import Colors from "@/constants/colors";
import { getItem, setItem } from "@/utils/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const [items, setItems] = useState(Items);
  const [filteredItems, setFilteredItems] = useState(Items);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );
  const [searchText, setSearchText] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    return ["All", ...uniqueCategories];
  }, [items]);

  const loadItems = async () => {
    const stored = await getItem("items");
    if (stored) {
      const parsedItems = JSON.parse(stored);
      setItems(parsedItems);
    } else {
      setItems(Items);
      await setItem("items", JSON.stringify(Items));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  useEffect(() => {
    applyFilters();
  }, [items, searchText, selectedCategory]);

  const applyFilters = () => {
    let filtered = items;
    if (searchText.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    setFilteredItems(filtered);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClear = () => {
    setSearchText("");
    setSelectedCategory("All");
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
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchText}
            onChangeText={handleSearch}
            onClear={handleClear}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  isSelected && styles.selectedCategoryButton,
                ]}
                onPress={() => handleCategorySelect(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemCard item={item} />}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoryContainer: {
    flexGrow: 0,
    marginBottom: 16,
    minHeight: 48,
  },
  categoryContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  selectedCategoryText: {
    color: Colors.white,
    fontWeight: "600",
  },
});
