import '../styles/globals.css'
import type {AppProps} from 'next/app'
import "../firebase/clientApp";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import AuthCheck from '../components/AuthCheck';
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout (
        <Provider store={store}>
            <AuthCheck>
                <Component {...pageProps} />
            </AuthCheck>
        </Provider>
    )
}

export default MyApp
