import { Dispatch } from 'react';
import { getData } from '../../cases/AsyncStorage/getData';
import { removeData } from '../../cases/AsyncStorage/removeData';
import { storeData } from '../../cases/AsyncStorage/storeData';

// Modelos
export interface TaskModel {
    title: string,
    deadline: Date,
    start_time: Date,
    end_time: Date,
    remind: string,
    repeat: string,
    done: boolean,
    index: Number,
}

// Actions
export interface TaskAction {
    readonly type: 'ON_TASK';
    payload: TaskModel[];
}

export interface TaskToggledAction {
    readonly type: 'ON_TOGGLE_TASK';
    payload: TaskModel;
}

export interface RemoveTasksAction {
    readonly type: 'ON_REMOVE_TASKS';
    payload: []
}

export interface ErrorAction {
    readonly type: 'ON_ERROR';
    payload: any;
}

export type UserAction = TaskAction | TaskToggledAction | RemoveTasksAction | ErrorAction;

// Estas son las acciones que se mandan a llamar
// desde los dispatch.
// useDispatch(functionName(parameters))

export const onAddTask = (data: TaskModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let old_data = await getData("@saved_tasks")

            let new_data = [...old_data, data]

            let save_data = await storeData("@saved_tasks", new_data)

            let done = save_data[0]
            let error = save_data[1]

            if (done) {
                let stored_data = await getData("@saved_tasks")

                dispatch({
                    type: 'ON_TASK',
                    payload: stored_data
                })
                return true
            }

            if (error) {
                dispatch({
                    type: 'ON_ERROR',
                    payload: 'Imposible to add a new task',
                });
                return false
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: 'ON_ERROR',
                payload: e,
            });
        }
    }
}

export const onToggleTask = (data: TaskModel, value: boolean) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {


            let new_stored_data = await getData("@saved_tasks")

            await new_stored_data.forEach((saved_data: TaskModel) => {
                if (saved_data.index === data.index) {
                    saved_data.done = value
                }
            })

            await storeData("@saved_tasks", new_stored_data)

            dispatch({
                type: 'ON_TASK',
                payload: new_stored_data
            })

        } catch (e) {
            console.log(e)
            dispatch({
                type: 'ON_ERROR',
                payload: e,
            });
        }
    }
}

export const retriveTasks = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let stored_data = await getData("@saved_tasks")

            // Agregar al estado cada que se haga el retrive.
            dispatch({
                type: 'ON_TASK',
                payload: stored_data
            })

            // console.log(stored_data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAllTasks = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await removeData("@saved_tasks")
            dispatch({
                type: 'ON_REMOVE_TASKS',
                payload: []
            })
        } catch (e) {
            console.log(e)
        }
    }
}