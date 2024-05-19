import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../assets/css/Sidebar.css";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export const Sidebar = () => {
    const { user, handleLogout } = useContext(UserContext);
    return (
        <Box className="sidebar bg-[#AD7A99] shadow rounded-md">
            <ul>
                <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#1976d2] duration-150 bg-white">
                    <Link to="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </Link>
                    <span className="font-semibold">
                        <Link to="/dashboard">
                            <Typography 
                                variant="h5" 
                                paragraph
                                sx={{
                                    fontSize: "16px"
                                }}
                            >
                                All Tasks
                            </Typography>
                        </Link>
                    </span>
                </li>
                <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#1976d2] duration-150">
                    <Link to="/new-task">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-[#1976d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </Link>
                <span className="font-semibold text-white hover:text-[#1976d2]">
                    <Link to="/new-task">
                        <Typography 
                            variant="h5" 
                            paragraph
                            sx={{
                                fontSize: "16px"
                            }}
                        >
                            New Task
                        </Typography>&nbsp;
                    </Link>
                </span>
                </li>
                <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#1976d2] duration-150">
                <Link to="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-[#1976d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </Link>
                <span className="font-semibold text-white hover:text-[#1976d2]">
                    <Link to="/profile">
                        <Typography 
                            variant="h5" 
                            paragraph
                            sx={{
                                fontSize: "16px"
                            }}
                        >
                            Profile
                        </Typography>
                    </Link>
                </span>{" "}
                </li>
                <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#1976d2] duration-150">
                <Link to="/edit-task">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-[#1976d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </Link>
                    <span className="font-semibold mb-8 text-white hover:text-[#1976d2]">
                        <Link to="/edit-task">
                            <Typography 
                                variant="h5" 
                                paragraph
                                sx={{
                                    fontSize: "16px"
                                }}
                            >
                                Edit Task
                            </Typography>{" "}
                        </Link>    
                    </span>
                </li>
                </ul>
                <PowerSettingsNewIcon 
                    sx={{ fontSize: 20 }}
                    className="inline text-white powerIcon mt-8 hover:text-[#1976d2]"
                />
                <span className="inline pl-3">
                <Link>
                    <Button 
                        type="submit"
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={handleLogout}
                        className="mt-10 inline text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                        >
                        Logout
                    </Button>
                </Link>
                </span>
        </Box>
    );
};