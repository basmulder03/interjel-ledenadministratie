import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changeLoggedInState, changeLoggedInUserData, selectLoggedInState} from "../redux/reducers/authSlice";
import {supabase} from "../supabase/initSupabase";
import {ApiError, Subscription, User} from "@supabase/gotrue-js";

const AuthCheck: React.FC = ({ children }) : JSX.Element => {
    const isLoggedIn = useAppSelector(selectLoggedInState);
    const dispatch = useAppDispatch();

    const [authSubscription, setAuthSubscription] = useState<{data: Subscription | null, error: ApiError | null}>({data: null, error: null});

    useEffect(() => {
        const session = supabase.auth.session();
        if ((session?.user ?? null) && !isLoggedIn) setUserData(true, session?.user)
        if (authSubscription.data === null) setAuthSubscription(supabase.auth.onAuthStateChange((_event, session) => {
            if (session && !isLoggedIn) setUserData(true, session?.user);
            else if (!session && isLoggedIn) setUserData(false);
        }));
        return () => {
            if (authSubscription.data !== null) authSubscription.data.unsubscribe();
        }
    }, []);

    const setUserData = (loginState: boolean, user: User | null | undefined = null) => {
        dispatch(changeLoggedInState(loginState));
        dispatch(changeLoggedInUserData({
            firstName: user?.user_metadata?.firstName || "",
            lastName: user?.user_metadata?.lastName || "",
            birthDay: user?.user_metadata?.birthDay || "",
            email: user?.user_metadata?.email || ""
        }))
    }

    return (
        <>
            {children}
        </>
    )
}

export default AuthCheck;