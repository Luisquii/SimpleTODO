import AsyncStorage from "@react-native-async-storage/async-storage";


export async function removeData(storage_key:string) {
    try{
        await AsyncStorage.removeItem(storage_key)
    }
    catch(e){
        console.log('%csremoveData.tsx line:10 e', 'color: #007acc;', e);
    }
}