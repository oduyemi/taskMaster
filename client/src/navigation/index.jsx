import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Register from "../pages/Register";
import TaskOverview from "../pages/TaskOverview";







export const Navigation = () => {
    return (
        <>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/task-overview" element={<TaskOverview />} />
                    {/* <Route element={<PrivateRoute />}>
                        <Route path="/task-overview" element={<TaskOverview />} />
                    </Route> */}
                </Routes>
        </>
  )
}


