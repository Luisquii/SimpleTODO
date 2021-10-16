import { UserAction, TaskModel } from '../actions/userActions';

type UserState = {
    // tasks: TaskModel;
    tasks: TaskModel[];
    error: string | undefined;
};

const initialState = {
    tasks: [],//{} as TasksList, //{} as TaskModel
    error: undefined,
};

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case 'ON_TASK':
            return {
                ...state,
                tasks: action.payload
            };

        case 'ON_TOGGLE_TASK':
            return {
                ...state,
                tasks: action.payload
            }

        case 'ON_REMOVE_TASKS':
            return {
                ...state,
                tasks: action.payload
            }

        case 'ON_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export { UserReducer };