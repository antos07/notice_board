import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {Notices} from "./pages/Notices";
import {Login} from "./pages/Login";
import {Notice} from "./pages/Notice";
import {Signup} from "./pages/Signup";
import {Profile} from "./pages/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Navigate to="notices"/>}/>
            <Route path="notices" element={<Notices/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="notices/:id" element={<Notice/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
