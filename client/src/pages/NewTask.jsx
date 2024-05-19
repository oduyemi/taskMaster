import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";

const NewTask = () => {
    const { user, setUser } = useContext(UserContext);
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        let requestedPath = "/new-task";
        if (!user) {
            localStorage.setItem("requestedPath", requestedPath)
            window.location.href="/login";
        } 
        }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/task", {
                task_name: taskName,
                task_priority: taskPriority,
                due_date: null, // Set to null or handle accordingly
            });
            setSuccess(response.data.message);
            setTaskName("");
            setTaskPriority("");
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Error creating task");
            setSuccess(null);
        }
    };

    return (
        <>
            <Box className="flex rel">
                <Sidebar />
                <Box
                    maxWidth="md"
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
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="primary">{success}</Typography>}
                    <form className="mx-auto" onSubmit={handleSubmit}>
                        <Box className="turn">
                            <input
                                type="text"
                                name="taskName"
                                className="w-72 border-2 mb-3 rounded-md px-3 py-3 bg-[#E8ECF4] backdrop-blur-lg"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Enter a new task"
                                required
                            />
                            <Box className="turn ml-1">
                                <label htmlFor="priority" className="mt-3 mb-2 font-semibold">Priority: </label>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="must"
                                        checked={taskPriority === "must"}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                        required
                                    />{" "}Must Do
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="should"
                                        checked={taskPriority === "should"}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                    />{" "}Should Do
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="could"
                                        checked={taskPriority === "could"}
                                        onChange={(e) => setTaskPriority(e.target.value)}
                                    />{" "}Could Do
                                </div>
                            </Box>
                            <Box className="mt-3 text-center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="flex justify-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                    type="submit"
                                >
                                    Add Todo Item
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default NewTask;
