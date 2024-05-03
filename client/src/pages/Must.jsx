import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { MustDo } from "../components/MustDo";


const Must = () => {
    const [todo, setTodo] = useState("");

    return (
        <Box className="flex">
            <Sidebar />
            <MustDo />
        </Box>   
  )
}

export default Must;