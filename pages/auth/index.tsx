import {NextPage} from 'next';
import {getAuth, signInWithEmailAndPassword} from "@firebase/auth";
import {validateEmail, validatePassword} from "../../utils/Validators";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeLoggedInState, selectLoggedInState} from "../../redux/reducers/authSlice";
import {useRouter} from "next/router";

const Auth: NextPage = () => {
    const auth = getAuth();
    const router = useRouter();

    const isLoggedIn = useAppSelector(selectLoggedInState);
    const dispatch = useAppDispatch();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firebaseError, setFirebaseError] = useState({visible: false, message: "", blocking: false});
    const [fieldsTouched, setFieldsTouched] = useState({email: false, password: false})

    useEffect(() => {
        if (isLoggedIn) router.push("/dashboard");
    }, [isLoggedIn])

    const login = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value;

        if (validateEmail(email) && validatePassword(password)) {
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                console.log(user);
                dispatch(changeLoggedInState(true));
            } catch (error: any) {
                let errorMessage = ""
                switch (error.code) {
                    case "auth/user-not-found":
                        errorMessage = "Dit email adres staat niet in de database, weet je zeker dat het de goede is?";
                        break;
                    case "auth/wrong-password":
                        errorMessage = "Dit wachtwoord is onjuist.";
                        break;
                    default:
                        errorMessage = "Oops! Er ging iets mis, probeer het later opnieuw.";
                        console.warn(error.code);
                        break;
                }
                setFirebaseError({ message: errorMessage, visible: true, blocking: true});
            }
        } else {
            setFirebaseError({...firebaseError, blocking: true})
            !validateEmail(email) && setEmailError("Dit is geen valide email adres");
            !validatePassword(password) && setPasswordError("Het wachtwoord moet minimaal 8 characters bevatten waaronder minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal karakter (#?!@$%^&*-)")
        }
    }

    const unblockSubmit = () : void => {
        if (firebaseError.blocking) setFirebaseError({...firebaseError, blocking: false});
    }

    const emailCheck = (event: React.FormEvent<HTMLInputElement>): void => {
        if (!fieldsTouched.email) setFieldsTouched({email: true, password: fieldsTouched.password});
        unblockSubmit();
        if (!validateEmail(event.currentTarget.value)) setEmailError("Dit is geen valide email adres");
        else setEmailError("");
    }

    const passwordCheck = (event: React.FormEvent<HTMLInputElement>): void => {
        if (!fieldsTouched.password) setFieldsTouched({password: true, email: fieldsTouched.email});
        unblockSubmit();
        const password = event.currentTarget.value;
        if (!validatePassword(password)) setPasswordError("Het wachtwoord moet minimaal 8 characters bevatten waaronder minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal karakter (#?!@$%^&*-)")
        else setPasswordError("");
    }

    return (
        <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
                        <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                    </div>
                    <div className="m-7">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative"
                             role="alert" style={{ display: (firebaseError.visible) ? "block" : "none"}}>
                            <span className="block sm:inline">{firebaseError.message}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setFirebaseError({...firebaseError, visible: false})}
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path
                                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                        <form onSubmit={login}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email
                                    Address</label>
                                <input type="email" name="email" id="email" placeholder="you@company.com" onChange={emailCheck}
                                       className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-900 ${(emailError === "") ? "border-gray-300 focus:border-indigo-300 dark:border-gray-600 dark:focus:border-gray-500" : "border-red-500 focus:border-red-700 dark:border-red-600 dark:focus:border-red-800"}`}/>
                                <p className="text-red-500 text-xs italic">{emailError}</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password"
                                           className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <a href="#!"
                                       className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot
                                        password?</a>
                                </div>
                                <input type="password" name="password" id="password" placeholder="Your Password"
                                       onChange={passwordCheck}
                                       className={`w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-900 ${(passwordError === "") ? "border-gray-300 focus:border-indigo-300 dark:border-gray-600 dark:focus:border-gray-500" : "border-red-500 focus:border-red-700 dark:border-red-600 dark:focus:border-red-800"}`}/>
                                <p className="text-red-500 text-xs italic">{passwordError}</p>
                            </div>
                            <div className="mb-6">
                                <button type="submit"
                                        disabled={(emailError !== "" || passwordError !== "" || firebaseError.blocking) || (!fieldsTouched.email || !fieldsTouched.password)}
                                        className={`w-full px-3 py-4 text-white ${!((emailError !== "" || passwordError !== "" || firebaseError.blocking) || (!fieldsTouched.email || !fieldsTouched.password)) ? "bg-indigo-600" : "bg-indigo-400"} rounded-md focus:bg-indigo-600 focus:outline-none`}
                                >Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;