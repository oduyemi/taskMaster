import React, { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import CouldDoList from "../components/CouldDoList";
import { Holidays } from "../components/Holidays";
import { MustDoList } from "../components/MustDoList";
import { ShouldDoList } from "../components/ShouldDoList";
import { Sidebar } from "../components/Sidebar";


const TaskOverview = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let requestedPath = "/dashboard";
    if (!user) {
        localStorage.setItem("requestedPath", requestedPath)
        window.location.href="/login";
    } 
    }, [user]);

    return (
      <>
          <Box className="flex rel">
            <Sidebar />

            <Box className="container relative z-1 flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-14">
              <Typography 
                variant="h2" 
                sx={{
                  fontSize:"20px"
                }}
                className="mb-1 rel pt-14 text-3xl font-extrabold leading-tight text-gray-900"
              >
                Tasks
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{
                  fontSize: "14px",
                  fontWeight: 300
                }}
                className="mb-12 text-lg text-gray-500"
              >
                Stay organized, and calm.
              </Typography>
              <Box className="w-full">
                <Box className="flex flex-col w-full mb-10 sm:flex-row">
                  <MustDoList />
                  <ShouldDoList />
                </Box>
                <Box className="flex flex-col w-full mb-5 sm:flex-row">
                  <Box className="w-full mb-10 sm:mb-0 sm:w-1/2">
                      <Box className="relative z-1 h-full ml-0 mr-0 sm:mr-10">
                          <span className="absolute z-1 top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                            <Link to="/holidays">
                              <Box className="relative z-1 h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                                  <Box className="flex items-center -mt-1">
                                    <Typography 
                                        variant="h3"
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 600
                                        }} 
                                        className="my-2 ml-3 text-lg font-bold text-gray-800"
                                    >
                                      Notable Days in 2024
                                    </Typography>
                                  </Box>
                                  <Typography 
                                    variant="h6" 
                                    paragraph 
                                    className="mt-1 mb-1 text-xs font-medium text-blue-400 uppercase"
                                  >
                                    ------------
                                  </Typography>
                                  <Holidays />
                              </Box>
                            </Link>
                      </Box>
                  </Box>
                      <Box className="w-full mb-10 sm:mb-0 sm:w-1/2">
                          <Box className="relative z-1 h-full ml-0 mr-0 sm:mr-10">
                              <span className="absolute z-1 top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                                <Link to="/calendar">
                                  <Box className="relative z-1 h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                                      <Box className="flex items-center -mt-1">
                                        <Typography 
                                            variant="h3"
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: 600
                                            }} 
                                            className="my-2 ml-3 text-lg font-bold text-gray-800"
                                        >
                                          Calendar
                                        </Typography>
                                      </Box>
                                      <Typography 
                                        variant="h6" 
                                        paragraph 
                                        className="mt-1 mb-1 text-xs font-medium text-yellow-400 uppercase"
                                      >
                                        ------------
                                      </Typography>
                                      <Calendar />
                                  </Box>
                              </Link>
                          </Box>
                      </Box>
                        <CouldDoList />
                  </Box>
              </Box>
          </Box>

          </Box>
      </>
  )
}

export default TaskOverview