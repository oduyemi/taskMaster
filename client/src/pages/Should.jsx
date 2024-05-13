import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { ShouldDo } from "../components/ShouldDo";


const Should = () => {
    const [todo, setTodo] = useState("");

    return (
        <Box className="flex rel">
            <Sidebar />
            <ShouldDo />
        </Box>   
  )
}

export default Should;