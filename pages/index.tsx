import CircularProgress from '@mui/material/CircularProgress';
import type {NextPage} from 'next'
import {selectLoggedInState} from "../redux/reducers/authSlice";
import {useAppSelector} from "../redux/hooks";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const router = useRouter();
    const isLoggedIn = useAppSelector(selectLoggedInState)

    useEffect(() => {
        if (isLoggedIn) router.push("/dashboard");
        else router.push("/auth")
    })

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center">
                <CircularProgress />
            </div>
        </div>
    )
}

export default Home
