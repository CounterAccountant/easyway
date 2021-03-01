import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import { combineReducers } from "redux";
import UserReducer from '../modules/user/UserReducer';
import MessagesReducer from '../modules/messages/MessagesReducer';

const reducers = combineReducers({
    user: UserReducer,
    messages: MessagesReducer,
});


export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
