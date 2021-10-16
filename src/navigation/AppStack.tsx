import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from './AppParamList';
import { Tasks } from '../screens/Tasks';
import { AddTasks } from '../screens/AddTasks';
import { Text } from 'react-native';

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