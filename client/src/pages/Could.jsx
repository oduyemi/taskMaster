import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { CouldDo } from "../components/CouldDo";


const Could = () => {
    const [todo, setTodo] = useState("");

    return (
        <Box className="flex">
            <Sidebar />
            <CouldDo />
        </Box>   
  )
}

export default Could;