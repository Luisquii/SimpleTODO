import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData(storage_key: string) {
  try {
    const value = await AsyncStorage.getItem(storage_key)
    if (value !== null) {
      return JSON.parse(value);
    }

    return []
  } catch (e) {
    console.log('%cgetData.tsx line:12 e', 'color: #007acc;', e);
  }
}