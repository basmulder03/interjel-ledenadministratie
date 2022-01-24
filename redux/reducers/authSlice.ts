import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface AuthState {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeLoggedInState: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { changeLoggedInState } = authSlice.actions;

export const selectLoggedInState = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;