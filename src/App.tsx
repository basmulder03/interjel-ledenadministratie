import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import PageNotFound from './components/error/PageNotFound';
import Home from "./components/dashboard/home/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Home />}>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
  );
}

export default App;
