import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, SectionList, ActivityIndicator } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import CheckTextBox from '../components/CheckTextBox';
import { ApplicationState, deleteAllTasks, retriveTasks, TaskModel } from '../redux';
import { ButtonStyles } from '../utils/todoStyles';

interface tasksProps {
    navigation: any
}

interface allTasksModel {
    title: string,
    data: TaskModel[]
}

export const Tasks: React.FC<tasksProps> = (props) => {

    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState<boolean>(true)
    const [allTasks, setAllTasks] = React.useState<allTasksModel[]>([])

    const { tasks }: { tasks: TaskModel[] } = useSelector(
        (state: ApplicationState) => state.userReducer
    )

    React.useEffect(() => {
        dispatch(retriveTasks())
    }, [])

    React.useEffect(() => {
        console.log(tasks)
        organizeTasks()
    }, [tasks])

    const organizeTasks = async () => {
        // Divided by completed and pending
        let divided = await divideTasks()

        // Sort by date
        let sorted = await sortTasks(divided[0], divided[1])

        let DATA = [
            {
                title: 'Completed Tasks',
                data: sorted[0]
            },
            {
                title: 'Pending Tasks',
                data: sorted[1]
            }
        ]

        setAllTasks(DATA)
        setLoading(false)
    }

    const divideTasks = async () => {
        let doneTasks: TaskModel[] | [] = []
        let notDoneTasks: TaskModel[] | [] = []

        await tasks.forEach((task: TaskModel) => {
            if (task.done) {
                doneTasks.push(task)
            }

            if (!task.done) {
                notDoneTasks.push(task)
            }
        })

        return [doneTasks, notDoneTasks]
    }

    const sortTasks = async (doneTasks: TaskModel[], notDoneTasks: TaskModel[]) => {

        // 
        await doneTasks.sort((a: TaskModel, b: TaskModel) => {
            return (
                b.index - a.index
            );
        })

        await notDoneTasks.sort((a: TaskModel, b: TaskModel) => {
            return (

                b.index - a.index
            );
        })

        return [doneTasks, notDoneTasks]
    }


    const renderItem = ({ item }: { item: TaskModel }) => {
        return <CheckTextBox {...item} />
    }

    if (loading) {
        return <ActivityIndicator size="large" animating={true} color={"black"} />
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
                <SectionList
                    sections={allTasks}
                    keyExtractor={(item) => item.index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontWeight: "bold", fontSize: 22, marginTop: 15 }}>{title}</Text>
                    )}
                />

            </View>
            <View style={{
                alignSelf: 'center',
                position: 'absolute',
                width: "100%",
                bottom: 25,
            }}>
                <TouchableOpacity
                    style={ButtonStyles.buttonContainer}
                    onPress={() => props.navigation.navigate('AddTasks')}
                >
                    <Text style={ButtonStyles.buttonText}>Add a Task</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
