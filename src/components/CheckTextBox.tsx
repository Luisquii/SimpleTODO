import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { onToggleTask } from '../redux';

interface CheckTextBoxProps {
    title: string,
    deadline: Date,
    start_time: Date,
    end_time: Date,
    remind: string,
    repeat: string,
    done: boolean,
    index: Number,
}

const CheckTextBox = (props: CheckTextBoxProps) => {
    const dispatch = useDispatch()

    const [toggleCheckBox, setToggleCheckBox] = React.useState<boolean>(props.done)

    const toggleTask = async (newValue: boolean) => {
        setToggleCheckBox(newValue)
        dispatch(onToggleTask(props, newValue))
    }

    return (
        <View style={styles.container}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onCheckColor='black'
                onTintColor='black'
                onValueChange={toggleTask}
            />
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

export default CheckTextBox;

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginVertical: 5,
        flexDirection: "row",
    },
    text: {
        alignSelf: "center",
        marginLeft: 5,
        fontWeight: "700",
        fontSize: 16
    }
});
