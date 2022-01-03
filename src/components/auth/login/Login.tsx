import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {Snackbar, TextField} from "@mui/material";

const Login = () => {
    const [state, setState] = useState({email: "", password: "", error: ""})
    const [valid, setValid] = useState({email: true, password: true})
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();

    const updateState = (updateData: object) => {
        setState({...state, ...updateData})
    }

    const updateValid = (updateData: object) => {
        setValid({...valid, ...updateData});
    }

    const login = async () => {
        updateState({error: ""})
        const auth = getAuth();
        try {
            let proceed = true;
            if (!checkEmail()) {
                proceed = false;
                updateValid({email: false});
            }
            if (!checkPassword()) {
                proceed = false;
                updateValid({password: false});
            }
            if (proceed) {
                const credentials = await signInWithEmailAndPassword(auth, state.email, state.password);
                setLoginSuccess(true);
                navigate("/dashboard", {state: {credentials}})
            }
        } catch (error: any) {
            if (error.name === "FirebaseError") {
                let message = "undefined"
                switch (error.code) {
                    case "auth/invalid-email":
                        message = "Dit emailadres bestaat niet 😢.";
                        break;
                    case "auth/wrong-password":
                        message = "Het wachtwoord is incorrect 😢.";
                        break;
                    case "auth/internal-error":
                        message = "Oops! Er is iets misgegaan 😢.";
                        break;
                }
                updateState({error: message});
            }
        }
    }

    const checkEmail = (): boolean => {
        const re =
            RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "g");
        const isValid = re.test(state.email);
        updateValid({email: isValid});
        return isValid;
    }

    const checkPassword = (): boolean => {
        const re =
            RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", "gm");
        const isValid = re.test(state.password);
        updateValid({password: isValid});
        return isValid;
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" className="gridContainer">
            <Snackbar open={loginSuccess} autoHideDuration={6000} onClose={() => setLoginSuccess(false)}
                      anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert severity="success">Login Successful</Alert>
            </Snackbar>
            <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h2" component="h1">Login</Typography>
                            </Grid>
                            {(state.error !== "") ? <Alert severity="error" variant="outlined"
                                                           className="fullWidth">{state.error}</Alert> : null}
                            <form autoComplete="off" className="fullWidth">
                                <Grid item xs={12}>
                                    <TextField id="email" type="email" error={!valid.email} fullWidth margin="dense"
                                               variant="standard" label="Email" helperText={(!valid.email) ?
                                        <span className="error">Dit is geen valide email adres.</span> : null}
                                               onChange={({target}) => {
                                                   updateState({email: target.value})
                                                   checkEmail();
                                               }} value={state.email}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="password" type="password" error={!valid.password} fullWidth
                                               margin="dense" variant="standard" label="Password"
                                               helperText={(!valid.password) ?
                                                   <span className="error">Het wachtwoord moet minimaal 8 tekens bevatten. In deze 8 tekens moet er minimaal 1 hoofdletter, 1 kleine letter en 1 cijfer zitten.</span> : null}
                                               onChange={({target}) => {
                                                   updateState({password: target.value});
                                                   checkPassword();
                                               }} value={state.password}/>
                                </Grid>
                            </form>
                            <Grid item xs={12}>
                                <Button size="large" color="primary" onClick={() => login()} variant="outlined"
                                        className="fullWidth"
                                        disabled={(state.email === "" || state.password === "") || (!valid.email || !valid.password)}>Login</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login;