import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting item in AsyncStorage:", error);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error getting item from AsyncStorage:", error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from AsyncStorage:", error);
  }
};

export const getAllItems = async (): Promise<{ [key: string]: string }> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const stores = await AsyncStorage.multiGet(keys);
    const allItems: { [key: string]: string } = {};
    stores.forEach(([key, value]) => {
      if (value !== null) {
        allItems[key] = value;
      }
    });
    return allItems;
  } catch (error) {
    console.error("Error getting all items from AsyncStorage:", error);
    return {};
  }
};

export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error("Error getting all keys from AsyncStorage:", error);
    return [];
  }
};