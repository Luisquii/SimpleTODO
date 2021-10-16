import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

interface InputAndroidDateProps {
    title: string;
    placeholder: string;
    onTextChange: Function;
    isDateSelector?: boolean;
    mode: any;
}

export const InputAndroidDate: React.FC<InputAndroidDateProps> = ({
    title,
    placeholder,
    onTextChange,
    mode = "date"
}) => {

    const [date, setDate] = React.useState<Date>(new Date())
    const [placeHolderDate, setPlaceHolderDate] = React.useState<string>('')
    const [showPicker, setShowPicker] = React.useState<boolean>(false)

    const setDateFromDTPtoDate = async (event: Event, date?: Date) => {
        if (date === undefined) {
            // Avoid android Crash
            await setShowPicker(false)
            return
        }
        mode === "date" && formatDate(date)
        mode === "time" && formatToAmOrPM(date)
        date && setDate(date)

        await setShowPicker(false)
    }

    const formatDate = (date: Date) => {
        let phDate = date.getFullYear() + '-' + String(date.getMonth() + 1) + '-' + date.getDate()
        setPlaceHolderDate(phDate)
        onTextChange(date)
    }

    const formatToAmOrPM = (date: Date) => {
        let hr = date.getHours();
        let min = date.getMinutes();

        let Am_PM = hr >= 12 ? 'PM' : 'AM';
        hr = hr % 12;
        hr = hr ? hr : 12; // the hour '0' should be '12'
        min = min < 10 ? '0' + min : min;

        let phTime = hr + ':' + min + ' ' + Am_PM;

        setPlaceHolderDate(phTime)
        onTextChange(date)
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#989a9c"
                    value={
                        mode === "date" ?
                            placeHolderDate ? placeHolderDate : undefined
                            :
                            mode === "time" &&
                                placeHolderDate ? placeHolderDate : undefined
                    }
                    onChangeText={(t: string) => onTextChange(t)}
                    style={[styles.input]}
                    onFocus={() => {
                        setShowPicker(true)
                        Keyboard.dismiss()
                    }}
                    // editable={false}
                    showSoftInputOnFocus={false}
                />

                {
                    showPicker &&
                    <DateTimePicker
                        value={date}
                        minimumDate={new Date()}
                        mode={mode}
                        style={{ alignSelf: "center", width: "100%" }}
                        onChange={setDateFromDTPtoDate}
                        display={mode === "date" ? "calendar" : "spinner"}
                    />
                }
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "column",
        marginHorizontal: "5%",
        marginVertical: "3%"
    },
    title: {
        fontWeight: "bold",
        marginBottom: 5,
        fontSize: 20
    },
    input: {
        // flex: 1,
        height: 50,

        borderRadius: 15,
        backgroundColor: "#e6e6e6",
        padding: 10
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
});
