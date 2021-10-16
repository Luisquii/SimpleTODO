

import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Platform, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Host } from 'react-native-paper-portal';
import { connect, useDispatch, useSelector } from 'react-redux';
import { validateData } from '../cases/validateData';
import Input from '../components/Input';
import { InputAndroidDate } from '../components/InputAndroidDate';
import InputDate from '../components/InputDate';
import { ApplicationState, deleteAllTasks, retriveTasks, onAddTask } from '../redux';
import { ButtonStyles } from '../utils/todoStyles';

interface addTasksProps {
    navigation: any;
}

export const AddTasks: React.FC<addTasksProps> = (props) => {

    const dispatch = useDispatch()
    const [title, setTitle] = React.useState<string>("")
    const [deadline, setDeadline] = React.useState<Date>(new Date())
    const [startingTime, setStartingTime] = React.useState<Date>(new Date())
    const [endingTime, setEndingTime] = React.useState<Date>(new Date())
    const [remind, setRemind] = React.useState<string>("")
    const [repeat, setRepeat] = React.useState<string>("")

    const remindOptions = [
        { key: 1, value: 'No reminder' },
        { key: 2, value: '10 minutes early' },
        { key: 3, value: '30 minutes early' },
        { key: 4, value: '1 hour early' },
        { key: 5, value: '2 hours early' },
    ]

    const repeatOptions = [
        { key: 1, value: 'No Repeat' },
        { key: 2, value: 'Daily' },
        { key: 3, value: 'Weekly' },
        { key: 4, value: 'Monthly' },
        { key: 5, value: 'Annualy' },
    ]
    const { tasks, error } = useSelector(
        (state: ApplicationState) => state.userReducer
    )

    const saveProcess = async () => {
        // set dates to starting time
        let new_start = startingTime
        new_start.setFullYear(deadline.getFullYear())
        new_start.setMonth(deadline.getMonth())
        new_start.setDate(deadline.getDate())

        // set dates to ending time 
        let new_ending = endingTime
        new_ending.setFullYear(deadline.getFullYear())
        new_ending.setMonth(deadline.getMonth())
        new_ending.setDate(deadline.getDate())

        let data = {
            title,
            deadline,
            start_time: new_start,
            end_time: new_ending,
            remind,
            repeat,
            done: false,
            index: Date.now(),
        }

        let isValid = validateData(data)

        if (isValid) {
            let answ = await dispatch(onAddTask(data))

            !answ && Alert.alert("Error", "No se pudo agregar la tarea")

            console.log("Desde save process: ", answ)

            answ && props.navigation.goBack()
        }
    }


    return (
        <Host>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <Input
                    title='Title'
                    placeholder='Design team meeting'
                    isDroppableDown={false}
                    onTextChange={setTitle}
                />


                {/* Se hizo por plataforma, ya que el 
    dateTimePicker funciona ligeramente diferente entre iOS y Android */}

                {
                    Platform.OS === "ios" && (
                        <>
                            <InputDate
                                title='Deadline'
                                placeholder='Select the date'
                                onTextChange={setDeadline}
                                mode="date"
                            />

                            <View style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>

                                <View style={{ width: "47.5%" }}>
                                    <InputDate
                                        title='Start time'
                                        placeholder='Select starting time'
                                        onTextChange={setStartingTime}
                                        mode="time"
                                    />

                                </View>

                                <View style={{ width: "47.5%" }}>
                                    <InputDate
                                        title='End time'
                                        placeholder='Select ending time'
                                        onTextChange={setEndingTime}
                                        mode="time"
                                    />
                                </View>
                            </View>
                        </>
                    )
                }

                {
                    Platform.OS === "android" && (
                        <>
                            <InputAndroidDate
                                title='Deadline'
                                placeholder='Select the date'
                                onTextChange={setDeadline}
                                mode="date"
                            />

                            <View style={{ flexDirection: "row", justifyContent: "center", alignSelf: "center" }}>

                                <View style={{ width: "47.5%" }}>
                                    <InputAndroidDate
                                        title='Start time'
                                        placeholder='Select starting time'
                                        onTextChange={setStartingTime}
                                        mode="time"
                                    />

                                </View>

                                <View style={{ width: "47.5%" }}>
                                    <InputAndroidDate
                                        title='End time'
                                        placeholder='Select ending time'
                                        onTextChange={setEndingTime}
                                        mode="time"
                                    />
                                </View>
                            </View>
                        </>
                    )
                }

                <Input
                    title='Remind'
                    placeholder='10 minutes early'
                    isDroppableDown={true}
                    optionsSelector={remindOptions}
                    onTextChange={setRemind}
                />

                <Input
                    title='Repeat'
                    placeholder='Weekly'
                    isDroppableDown={true}
                    optionsSelector={repeatOptions}
                    onTextChange={setRepeat}
                />


                <View style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    width: "100%",
                    bottom: 25,
                }}>
                    <TouchableOpacity
                        style={ButtonStyles.buttonContainer}
                        onPress={saveProcess}
                    >
                        <Text style={ButtonStyles.buttonText}>Create a Task</Text>
                    </TouchableOpacity>
                </View>
                {/* <Button
                title='Tocame'
                onPress={() => {  }}
            /> */}

                {/* <Text>{user.firstName}</Text> */}
            </ScrollView>
        </Host>
    )
}
