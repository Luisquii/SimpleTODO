import AsyncStorage from "@react-native-async-storage/async-storage";


export async function storeData(storage_key: string, value: any) {
    let succeed: boolean = false
    let error: any = null

    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storage_key, jsonValue)
        succeed = true
    }
    catch (e) {
        console.log(e)
        error = e
    }

    return [succeed, error]
}