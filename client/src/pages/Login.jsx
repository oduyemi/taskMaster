import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";

const Login = () => {
  const { handleLogin, flashMessage } = useContext(UserContext);
  const [formData, setFormData] = useState({
      emailOrUsername: "",
      password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setFormSubmitted(true); 
      const success = await handleLogin(formData.emailOrUsername, formData.password);
      if (success) {
          const requestedPath = localStorage.getItem("requestedPath");
          window.location.href = requestedPath ? requestedPath : "/dashboard";
      }
  };

  console.log("flashMessage:", flashMessage);

  return (
    <Box margin="10px">
        <section className="min-h-svh mt-14">
            <Box className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
                <Typography 
                    variant="h3" 
                    className="text-[#1976d2] font-bold text-3xl"
                    sx={{ fontSize: "larger" }}
                >
                    Welcome Back
                </Typography>
                <Typography
                    variant="h6"
                    paragraph
                    className="mt-2 text-2xl text-gray-700"
                    sx={{ fontSize: "14px", fontWeight: 400 }}
                >
                    Sign in to your account
                </Typography>
            </Box>

            <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                    <Box maxWidth="400px">
                        {flashMessage && typeof flashMessage === 'string' && ( 
                            <Box className={`text-center text-white py-2 mb-4 ${flashMessage.includes("Success") ? "bg-green-500" : "bg-red-500"}`}>
                                <Typography variant="body1">{flashMessage}</Typography>
                            </Box>
                        )}
                    </Box>
                    <Box>
                        <label htmlFor="emailOrUsername" className="block text-sm font-medium leading-6 text-gray-900">Email or Username</label>
                        <Box className="mt-1">
                            <input 
                                name="emailOrUsername" 
                                type="text"
                                required
                                placeholder='Enter your email or username' 
                                className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none"
                                onChange={handleChange}
                                value={formData.emailOrUsername}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Box className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <Box className="text-sm">
                                <Link to="/forget-password" className="font-semibold text-[#4291B0] hover:text-[#4291B0]">Forgot password?</Link>
                            </Box>
                        </Box>
                        <Box className="mt-2">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required
                                placeholder="Enter your password"
                                className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </Box>
                    </Box>
                        <Box>
                            <Button 
                                type="submit"
                                variant="contained"
                                size="large"
                                color="primary"
                                className="flex w-full justify-center px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                            >
                                Login
                            </Button>
                        </Box>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">
                        Don{"'"}t have an account?
                        <Link to="/register" className="font-semibold leading-6 text-[#4291B0] hover:text-[#4291B0] ml-2">Sign up</Link>
                    </p>
                </Box>
            </section>
        </Box>
    );
}

export default Login;
