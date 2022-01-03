import React from 'react';
import {getAuth, signOut} from 'firebase/auth';
import {useLocation, useNavigate} from "react-router-dom";

const Home = () => {
    const { state } = useLocation();
    console.log(state);

    const navigate = useNavigate();

    const back = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate("/login");
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <h1 onClick={() => back()}>Home</h1>
    )
}

export default Home;