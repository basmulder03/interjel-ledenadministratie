// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp} from "firebase/app";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import "firebase/auth";

const setupFirebase = () : FirebaseApp => {

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBgy1t2tN8SwnY1vtZ6yTvf6ZXzqiWiFpo",
        authDomain: "interjel-db5f1.firebaseapp.com",
        projectId: "interjel-db5f1",
        storageBucket: "interjel-db5f1.appspot.com",
        messagingSenderId: "912202664857",
        appId: "1:912202664857:web:54eb5ceb5c87fb009d6108",
        measurementId: "G-P5CQ4HQ1TV"
    };

    // Initialize Firebase
    return initializeApp(firebaseConfig);
}

export default setupFirebase;