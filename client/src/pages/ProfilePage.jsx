import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { Profile } from "../components/Profile";


const ProfilePage = () => {
    const [todo, setTodo] = useState("");

    return (
        <Box className="flex rel">
            <Sidebar />
            <Profile />
        </Box>   
  )
}

export default ProfilePage;