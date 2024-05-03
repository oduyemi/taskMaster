import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../UserContext";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Features from "../pages/Features";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Register from "../pages/Register";
import TaskOverview from "../pages/TaskOverview";
import NewTask from "../pages/NewTask";
import UpdateTask from "../pages/UpdateTask";
import ProfilePage from "../pages/ProfilePage";








export const Navigation = () => {
    return (
        <UserProvider>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<TaskOverview />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/new-task" element={<NewTask />} />
                    <Route path="/edit-task" element={<UpdateTask />} />
                </Routes>
        </UserProvider>
  )
}


