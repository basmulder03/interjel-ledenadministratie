import CircularProgress from '@mui/material/CircularProgress';
import type {NextPage} from 'next'
import {useEffect} from "react";
import {getAuth, User} from "@firebase/auth";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changeLoggedInState, selectLoggedInState} from "../redux/reducers/authSlice";


const Home: NextPage = () => {
    const auth = getAuth();
    const router = useRouter();

    const isLoggedIn = useAppSelector(selectLoggedInState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user: User | null) => {
           if (user) {
               if (!isLoggedIn) dispatch(changeLoggedInState(true))
               router.push("/dashboard");
           }
           else {
               if (isLoggedIn) dispatch(changeLoggedInState(false));
               router.push("/auth");
           }
        });
    });

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center">
                <CircularProgress />
            </div>
        </div>
    )
}

export default Home
