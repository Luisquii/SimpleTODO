import { RouteProp } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"

export type AppParamList = {
    Tasks: {};
    AddTasks: {};
}

export type AppNavProps<T extends keyof AppParamList> = {
    navigation: StackNavigationProp<AppParamList, T>;
    route: RouteProp<AppParamList, T>;
}