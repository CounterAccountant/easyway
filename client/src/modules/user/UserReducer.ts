import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IUser, ILoginRequest, ILoginResponse } from "easyway-types";
import { RootState } from "../../store";
import Request from "../../services/axios.service";


interface UserState {
    user?: IUser;
    logged_in: boolean;
    username_in_signup_form: string;
    signup_error?: string;
}

const initialState: UserState = {
    logged_in: false,
    username_in_signup_form: ''
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsernameInSignup: (state: UserState, action: PayloadAction<string>) => {
            state.username_in_signup_form = action.payload;
        },
        setUser: (state: UserState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setLoggedIn: (state: UserState, action: PayloadAction<boolean>) => {
            state.logged_in = action.payload;
        },
        setSignupError: (state: UserState, action: PayloadAction<string>) => {
            state.signup_error = action.payload;
        }
    },
});

export const { setUsernameInSignup, setUser, setLoggedIn, setSignupError } = UserSlice.actions;


export const getLoggedIn = (state: RootState): boolean => state.user.logged_in;
export const getUser = (state: RootState): IUser | undefined => state.user.user;
export const getUsernameInSignupForm = (state: RootState): string => state.user.username_in_signup_form;
export const getSignupFormAlert = (state: RootState): string | undefined => state.user.signup_error;



export const loginToChat = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const username = getState().user.username_in_signup_form
    const requestData: ILoginRequest = { username }
    const userData = await Request<ILoginResponse>({
        url: 'user/signup',
        method: 'POST',
        data: requestData,
    });
    if (userData.data && userData.data.success && userData.data.user) {
        dispatch(setLoggedIn(true));
        dispatch(setUser(userData.data.user));
    } else {
        dispatch(setSignupError(userData.data.message || 'Unexpected error'));
    }
}




export default UserSlice.reducer;

