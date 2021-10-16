
import * as React from 'react';
import { Text, View, StyleSheet, ListRenderItemInfo, Keyboard, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import { Portal } from 'react-native-paper-portal';
import BottomSheet from 'reanimated-bottom-sheet';
import { ButtonStyles } from '../utils/todoStyles';

interface InputProps {
    title: string;
    placeholder: string;
    onTextChange: Function;
    isDroppableDown?: boolean;
    optionsSelector?: reminderInterface[]
    // cb_optionSelected:
}

interface reminderInterface {
    key: number,
    value: string
}

export const Input: React.FC<InputProps> = ({
    title,
    placeholder,
    onTextChange,
    isDroppableDown = false,
    optionsSelector = []
}) => {

    const [isDropdown, setIsDropDown] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<reminderInterface[]>([])
    const [text, setText] = React.useState<null | string>(null)

    const bottomSheetRef = React.useRef(null);

    React.useEffect(() => {
        setIsDropDown(isDroppableDown)
        setOptions(optionsSelector)
    }, [])

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                {/* <View style={styles.panelHandle} /> */}
            </View>
        </View>
    );

    const renderOptions = ({ item }:
        ListRenderItemInfo<reminderInterface>
    ) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onTextChange(item.value)
                    setText(item.value)
                    bottomSheetRef.current.snapTo(1)
                }}
                style={ButtonStyles.buttonContainer}
            >
                <Text
                    style={ButtonStyles.buttonText}
                    allowFontScaling={false}
                >{item.value}</Text>
            </TouchableOpacity>
        )
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
                        bottomSheetRef.current.snapTo(1)
                    }}
                    style={{ alignSelf: "flex-end" }}
                >
                    <Text style={{ color: "blue", fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>
                <Text
                    style={{ fontSize: 20, fontWeight: "bold" }}
                    allowFontScaling={false}
                >Select a reminder</Text>

                <FlatList
                    data={options}
                    renderItem={renderOptions}
                    keyExtractor={item => item.key}
                />
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>

                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#989a9c"
                    onChangeText={(t: string) => onTextChange(t)}
                    style={styles.input}
                    onFocus={() => {
                        if (isDropdown) {
                            Keyboard.dismiss()
                            bottomSheetRef.current.snapTo(0)
                        }
                    }}
                    value={text ? text : undefined}
                    showSoftInputOnFocus={isDropdown ? false : true}
                />
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

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
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
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#e6e6e6",
        padding: 10
    },
    header: {
        backgroundColor: Platform.OS === "ios" ? "#FFF" : '#e6e6e6',
        shadowColor: '#000',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
    },
});
