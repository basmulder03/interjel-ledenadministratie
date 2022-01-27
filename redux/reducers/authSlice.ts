import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface AuthState {
    isLoggedIn: boolean,
    firstName: string,
    lastName: string,
    birthDay: string,
    email: string,
}

const initialState: AuthState = {
    isLoggedIn: false,
    firstName: '',
    lastName: '',
    birthDay: '',
    email: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeLoggedInState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        changeLoggedInUserData: (state, action: PayloadAction<{firstName: string, lastName: string, birthDay: string, email: string}>) => {
            const {firstName, lastName, birthDay, email} = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.birthDay = birthDay;
            state.email = email;
        }
    },
});

export const { changeLoggedInState, changeLoggedInUserData } = authSlice.actions;

export const selectLoggedInState = (state: RootState) => state.auth.isLoggedIn;
export const selectLoggedInUserData = (state: RootState) => state.auth;

export default authSlice.reducer;