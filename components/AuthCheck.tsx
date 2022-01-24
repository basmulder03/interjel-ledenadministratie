import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changeLoggedInState, selectLoggedInState} from "../redux/reducers/authSlice";
import {getAuth} from "@firebase/auth";

const AuthCheck: React.FC = ({ children }) : JSX.Element => {
    const auth = getAuth();
    const isLoggedIn = useAppSelector(selectLoggedInState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (!isLoggedIn) dispatch(changeLoggedInState(true))
            } else {
                if (isLoggedIn) dispatch(changeLoggedInState(false));
            }
        })
    });

    return (
        <>
            {children}
        </>
    )
}

export default AuthCheck;