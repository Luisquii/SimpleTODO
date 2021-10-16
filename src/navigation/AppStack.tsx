import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from './AppParamList';
import { Tasks } from '../screens/Tasks';
import { AddTasks } from '../screens/AddTasks';
import { Text, View } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
interface AppStackProps {

}

const Stack = createStackNavigator<AppParamList>();

export const AppStack: React.FC<AppStackProps> = ({ }) => {

    return (
        <Stack.Navigator >
            <>


                <Stack.Screen
                    name="Tasks"
                    component={Tasks}
                    options={{
                        headerLeft: () => (<Text style={{ fontWeight: "bold", fontSize: 24, marginLeft: 20 }}>To-Do App</Text>),
                        headerTitle: () => null,
                        headerRight: () => (
                            <View style={{ flexDirection: "row", marginRight: 5 }}>
                                <AntDesign name="search1" size={25} />
                                <Ionicons name="notifications-outline" size={25} />
                                <Entypo name="menu" size={25} />
                            </View>
                        ),
                        headerStyle: { backgroundColor: "#FFFFFF", shadowColor: 'gray' },

                    }}
                />
                <Stack.Screen
                    name="AddTasks"
                    component={AddTasks}
                    options={{

                    }}
                />


            </>
        </Stack.Navigator>
    )
}