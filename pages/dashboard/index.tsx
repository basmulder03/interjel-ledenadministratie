import {NextPage} from 'next';
import {getAuth, signOut} from "@firebase/auth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeLoggedInState, selectLoggedInState} from "../../redux/reducers/authSlice";
import DashboardLayout from "../../components/DashboardLayout";

const Dashboard = () => {
    const auth = getAuth();
    const router = useRouter();

    const isLoggedIn = useAppSelector(selectLoggedInState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) router.push("/auth");
    }, [isLoggedIn])

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={async () => {
                try {
                    await signOut(auth);
                    dispatch(changeLoggedInState(false));
                } catch (error) {
                    console.error(error);
                }

            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Sign Out</button>
        </div>
    )
}

Dashboard.getLayout = (dashboard: NextPage) => (
    <DashboardLayout>
        {dashboard}
    </DashboardLayout>
)

export default Dashboard;