import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { DashboardNav } from "../components/DashboardNav";


const NewTask = () => {
    const [todo, setTodo] = useState("");

    return (
        <>
            <Box className="flex">
                <Sidebar />
                <Box maxWidth="md" 
                    margin="10px" 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center" 
                        }}
                        className="gap-4 formbox"
                    >
                        <Typography 
                            variant="h3" 
                            className="pt-14 pb-3 text-[#1976D2] text-center"
                            sx={{
                                fontSize: "20px"
                            }}
                        >
                            Add New Task
                        </Typography>
                        <form className="mx-auto">
                            <Box className="turn">
                                <input
                                    type="text"
                                    name="taskName"
                                    className="w-72 border-2 mb-3 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                                    value={todo}
                                    onChange={(e) => {
                                    setTodo(e.target.value);
                                    }}
                                    placeholder="Enter a new task"
                                />
                            <Box className="turn ml-1">
                                <label for="priority" className="mt-3 mb-2 font-semibold">Priority: </label>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        className=""
                                    /> {" "}Must Do
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        className=""
                                    /> {" "}Should Do
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        className=""
                                    /> {" "}Could Do
                                </div>
                            </Box>
                                <Box className="mt-3 text-center">
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        className="flex justify-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                        onClick={() => {
                                        //execute function to add new todo to the list
                                        }}
                                    >
                                        Add Todo Item
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                </Box>
            </Box>  
        </> 
    )
}

export default NewTask