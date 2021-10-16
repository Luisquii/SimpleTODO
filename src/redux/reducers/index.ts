import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer,

    // Por si llegamos a utilizar otro reducer, se una en el combineReducers

});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };