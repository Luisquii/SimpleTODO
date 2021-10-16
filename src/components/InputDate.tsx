
import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Keyboard, TouchableOpacity, Platform } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Portal } from 'react-native-paper-portal';
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
interface InputDateProps {
    title: string;
    placeholder: string;
    onTextChange: Function;
    isDateSelector?: boolean;
    mode: any;
}

export const InputDate: React.FC<InputDateProps> = ({
    title,
    placeholder,
    onTextChange,
    mode = "date"
}) => {

    const [date, setDate] = React.useState<Date>(new Date())
    const [placeHolderDate, setPlaceHolderDate] = React.useState<string>('')
    const bottomSheetRef = React.useRef(null);

    React.useEffect(() => {
    }, [])

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader} />
        </View>
    );

    const setDateFromDTPtoDate = (event: Event, date?: Date) => {
        if (date === undefined) {
            // Avoid android Crash
            return
        }
        date && setDate(date)
    }

    const formatDate = (date: Date) => {
        let phDate = date.getFullYear() + '-' + String(date.getMonth() + 1) + '-' + date.getDate()
        setPlaceHolderDate(phDate)
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
    }

    const renderContent = () => {
        return (
            <View style={{
                backgroundColor: Platform.OS === "ios" ? "#FFF" : '#e6e6e6',
                padding: 16,
                height: 650, //650
            }}>

                <TouchableOpacity
                    onPress={() => {
                        mode === "date" &&
                            formatDate(date)

                        mode === "time" &&
                            formatToAmOrPM(date)
                        onTextChange(date)
                        bottomSheetRef.current.snapTo(1)
                    }}
                >
                    <Text style={{ alignSelf: "flex-end", color: "green", fontSize: 18 }}>Listo</Text>
                </TouchableOpacity>

                <Text
                    style={{ fontSize: 20, fontWeight: "bold" }}
                    allowFontScaling={false}
                >{mode === "date" ? "Due date" : "Select time"}</Text>

                <DateTimePicker
                    value={date}
                    // minimumDate={new Date()}
                    mode={mode}
                    style={{ alignSelf: "center", width: "100%" }}
                    onChange={setDateFromDTPtoDate}
                    display={Platform.OS === "ios" ? "spinner" : "calendar"}
                />
            </View>
        )
    }

    return (
        < >

            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.inputContainer}>

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
                            Keyboard.dismiss()
                            bottomSheetRef.current.snapTo(0)
                        }}
                        showSoftInputOnFocus={false}

                    />
                    {
                        mode === "time" && <Ionicons style={{ alignSelf: "center", marginRight: 3 }} name="time-outline" size={20} color="#000" />
                    }
                    {
                        mode === "date" && <Feather style={{ alignSelf: "center", marginRight: 3 }} name="calendar" size={20} color="#000" />
                    }

                </View>
            </View>

            <Portal >

                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={["50%", -10]}
                    initialSnap={1}
                    enabledGestureInteraction={true}
                    renderContent={renderContent}
                    renderHeader={renderHeader}
                />
            </Portal>
        </>
    );
}

export default InputDate;

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
        backgroundColor: Platform.OS === "ios" ? "#FFF" : '#e6e6e6',
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
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: "#e6e6e6",
        borderRadius: 15,
        justifyContent: "space-between"
    }
});
