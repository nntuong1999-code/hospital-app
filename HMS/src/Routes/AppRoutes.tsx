import React from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Random from "../Components/Random";
import AdminDashBoard from "../Layout/AdminDashBoard";
import LoginPage from "../Pages/LoginPage"
import RegisterPage from "../Pages/RegisterPage";
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                    
                    <Route path='/login' element={<LoginPage />}/>
                    <Route path='/register' element={<RegisterPage />}/>
                    <Route path='/' element={<AdminDashBoard />}>
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />
                    <Route path="/appointments" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes