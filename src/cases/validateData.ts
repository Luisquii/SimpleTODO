import { Alert } from "react-native";
import { TaskModel } from "../redux";


export function validateData(data: TaskModel) {
    // console.log(data)

    let isValid = true
    //Validate title
    if (!data.title) {
        Alert.alert("Error ❌", "Please write a title for this task")
        isValid = false
    }

    // Validate deadline
    if (!data.deadline) {
        Alert.alert("Error ❌", "Please provide a deadline")
        isValid = false
    }

    // Validate deadline
    if (data.end_time.getTime() < data.start_time.getTime()) {
        Alert.alert("Error ❌", "Starting date is greater than ending date")
        isValid = false
    }

    return isValid

} 