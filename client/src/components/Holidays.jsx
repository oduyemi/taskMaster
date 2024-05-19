import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export const Holidays = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axios.get("https://taskmasterapi.vercel.app/holidays");
                setHolidays(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchHolidays();
    }, []);

    if (loading) {
        return (
            <Box>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography>Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <ul>
                {holidays.map((holiday) => (
                    <li key={holiday._id}>
                        {holiday.name} - {holiday.date}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default Holidays;
