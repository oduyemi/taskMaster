import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { user, setUser } = useContext(UserContext);
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        let requestedPath = "/edit-task";
        if (!user) {
            localStorage.setItem("requestedPath", requestedPath)
            window.location.href="/login";
        } 
        }, [user]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/tasks/${taskId}`);
                const task = response.data.task;
                setTaskName(task.task_name);
                setTaskPriority(task.task_priority);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching task");
            }
        };

        fetchTask();
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/tasks/${taskId}`, {
                task_name: taskName,
                task_priority: taskPriority,
            });
            setSuccess(response.data.message);
            setError(null);
            navigate("/tasks");
        } catch (err) {
            setError(err.response?.data?.message || "Error updating task");
            setSuccess(null);
        }
    };

    return (
        <Box className="flex">
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
                    Edit Task
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
                            placeholder="Enter task"
                            />
                    <Box className="turn ml-1">
                        <label for="priority" class="mt-3 mb-2 font-semibold">Priority: </label>
                        <div className="mb-2">
                            <input
                                type="radio"
                                name="priority"
                                className=""
                                checked={taskPriority === "must"}
                                onChange={(e) => setTaskPriority(e.target.value)}
                            /> {" "}Must Do
                        </div>
                        <div className="mb-2">
                            <input
                                type="radio"
                                name="priority"
                                className=""
                                checked={taskPriority === "should"}
                                onChange={(e) => setTaskPriority(e.target.value)}
                            /> {" "}Should Do
                        </div>
                        <div className="mb-2">
                            <input
                                type="radio"
                                name="priority"
                                className=""
                                checked={taskPriority === "could"}
                                onChange={(e) => setTaskPriority(e.target.value)}
                            /> {" "}Could Do
                        </div>
                    </Box>
                        <Box className="mt-3 text-center">
                            <Button 
                                variant="contained"
                                color="primary"
                                className="flex justify-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                                type="submit"
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </form>
              
            </Box>
        </Box>   
  )
}

export default UpdateTask