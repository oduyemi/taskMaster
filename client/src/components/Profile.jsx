import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Box } from "@mui/material";
import axios from "axios";





export const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [flashMessage, setFlashMessage] = useState(null)
    const [userDetails, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: ""
    });
   
    useEffect(() => {
        let requestedPath = "/profile";
        if (!user) {
            setFlashMessage({
                type: "error",
                message: "You need to login first!",
            });
            localStorage.setItem("requestedPath", requestedPath)
            window.location.href="/login";
        } else {
            setUserDetails({
                fname: user.fname || "",
                lname: user.lname || "",
                email: user.email || ""
            });
            }
        }, [user]);

        useEffect(() => {
            const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
            if (storedUserDetails) {
                setUserDetails(storedUserDetails);
            }
        }, []);

        const updateUserData = async () => {
            try {
                const response = await axios.put(`https://locale-4z2n.onrender.com/users/${user.id}`, {
                    fname: userDetails.fname,
                    lname: userDetails.lname,
                    email: userDetails.email
                });
    
                if (response.status === 200) {
                    console.log("Success:", response.data);
                    setUser(response.data);
                    localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    setFlashMessage({
                        type: "success",
                        message: "User details updated successfully!",
                    });
                    setTimeout(() => {
                        window.location.href = "/dashboard";
                    }, 2000);
                } else {
                    setFlashMessage({
                        type: "error",
                        message: "Failed to update user details",
                    });
                }
            } catch (error) {
                console.error("Error updating user details:", error);
                setFlashMessage({
                    type: "error",
                    message: "An error occurred while updating user details",
                });
            }
        };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

        localStorage.setItem('userDetails', JSON.stringify({
            ...userDetails,
            [name]: value
        }));
    };

    if (!user) {
        return (
            <Box className="container">
                
            </Box>
        );
    }

    return(
        <Box className="container rounded bg-transparent mt-5 pt-5 mb-5">
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto mt-5 shadow">
                <Box className="col-span-1 md:border-r mx-auto">
                    <Box className="p-3 py-5">
                        <Box className="flex justify-end items-center mb-3">
                            <h3 className="text-right">Account Details</h3>
                        </Box>
                        {flashMessage && (
                            <Box className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {flashMessage.message}
                            </Box>
                        )}
                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <Box>
                                <label className="labels" htmlFor="fname">First Name</label>
                                <input 
                                    name="fname"
                                    type="text" 
                                    className="form-control" 
                                    value={userDetails.fname || user.fname}  
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <label className="labels" htmlFor="lname">Surname</label>
                                <input 
                                    name="lname"
                                    type="text" 
                                    className="form-control"
                                    value={userDetails.lname || user.lname} 
                                    onChange={handleChange} 
                                />
                            </Box>
                            <Box className="col-span-2">
                                <label className="labels" htmlFor="email">Email Address</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    className="form-control" 
                                    value={userDetails.email || user.email}
                                    onChange={handleChange} 
                                />
                            </Box> 
                        </Box> 
                        <Box className="mt-5 text-center">
                            <button 
                                className="btn btn-success profile-button" 
                                onClick={updateUserData}
                            >
                                Save Changes
                            </button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};