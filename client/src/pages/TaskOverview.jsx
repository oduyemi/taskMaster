import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import { Holidays } from "../components/Holidays";
import { Sidebar } from "../components/Sidebar";


const TaskOverview = () => {

    return (
      <>
          <Box className="flex">
            <Sidebar />

            <Box className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
              <Typography 
                variant="h2" 
                sx={{
                  fontSize:"20px"
                }}
                className="mb-1 text-3xl font-extrabold leading-tight text-gray-900"
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
                      <Box className="w-full mb-10 sm:mb-0 sm:w-1/2">
                          <Box className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                                <Link to="/must-do-list">
                                  <Box className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                    <Box className="flex items-center -mt-1">
                                        <Typography 
                                          variant="h3"
                                          sx={{
                                            fontSize: "14px",
                                            fontWeight: 600
                                          }} 
                                          className="my-2 ml-3 text-lg font-bold text-gray-800"
                                        >
                                          Must Do List
                                        </Typography>
                                    </Box>
                                    <Typography 
                                      variant="h6" 
                                      paragraph 
                                      className="mt-1 mb-1 text-xs font-medium text-indigo-500 uppercase"
                                    >
                                      ------------
                                    </Typography>
                                    <Typography 
                                      variant="h6" 
                                      paragraph 
                                      className="mb-2 text-gray-600"
                                      sx={{
                                        fontSize: "16px",
                                        fontWeight: 300
                                      }}
                                    >
                                      It appears your list is empty
                                      <span className="inline pl-3">
                                        <Link to="/new-task">
                                          <Button 
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className="mt-10 inline text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                            >
                                            Add New
                                          </Button>
                                        </Link>
                                        </span>
                                    </Typography>
                                  </Box>
                                </Link>
                          </Box>
                      </Box>
                      <Box className="w-full sm:w-1/2">
                          <Box className="relative h-full ml-0 md:mr-10">
                              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                                <Link to="/should-do-list">
                                  <Box className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                                      <Box className="flex items-center -mt-1">
                                      <Typography 
                                            variant="h3"
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: 600
                                            }} 
                                            className="my-2 ml-3 text-lg font-bold text-gray-800"
                                          >
                                            Should Do List
                                          </Typography>
                                      </Box>
                                      <Typography 
                                        variant="h6" 
                                        paragraph 
                                        className="mt-1 mb-1 text-xs font-medium text-purple-500 uppercase"
                                      >
                                        ------------
                                      </Typography>
                                      <Typography 
                                        variant="h6" 
                                        paragraph 
                                        className="mb-2 text-gray-600"
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: 300
                                        }}
                                      >
                                        It appears your list is empty
                                        <span className="inline pl-3">
                                        <Link to="/new-task">
                                          <Button 
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className="mt-10 inline text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                            >
                                            Add New
                                          </Button>
                                        </Link>
                                        </span>
                                      </Typography>
                                  </Box>
                                </Link>
                          </Box>
                      </Box>
                  </Box>
                  <Box className="flex flex-col w-full mb-5 sm:flex-row">
                      <Box className="w-full mb-10 sm:mb-0 sm:w-1/2">
                          <Box className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                                <Link to="/holidays">
                                  <Box className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
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
                          <Box className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                                <Link to="/calendar">
                                  <Box className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
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
                      <Box className="w-full sm:w-1/2">
                          <Box className="relative h-full ml-0 md:mr-10">
                              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                                <Link to="/could-do-list">
                                  <Box className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                                      <Box className="flex items-center -mt-1">
                                        <Typography 
                                          variant="h3"
                                          sx={{
                                            fontSize: "14px",
                                            fontWeight: 600
                                          }} 
                                          className="my-2 ml-3 text-lg font-bold text-gray-800"
                                        >
                                          Could Do List
                                        </Typography>
                                      </Box>
                                      <Typography 
                                        variant="h6" 
                                        paragraph 
                                        className="mt-1 mb-1 text-xs font-medium text-green-500 uppercase"
                                      >
                                        ------------
                                      </Typography>
                                      <Typography 
                                        variant="h6" 
                                        paragraph 
                                        className="mb-2 text-gray-600"
                                        sx={{
                                          fontSize: "16px",
                                          fontWeight: 300
                                        }}
                                      >
                                        It appears your list is empty
                                        <span className="inline pl-3">
                                          <Link to="/new-task">
                                            <Button 
                                              type="submit"
                                              variant="contained"
                                              size="small"
                                              color="primary"
                                              className="mt-10 inline text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                            >
                                              Add New
                                            </Button>
                                          </Link>
                                        </span>
                                      </Typography>
                                  </Box>
                                </Link>
                          </Box>
                      </Box>
                  </Box>
              </Box>
          </Box>

          </Box>
      </>
  )
}

export default TaskOverview