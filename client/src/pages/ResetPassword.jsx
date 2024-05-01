import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Box, Typography, Button} from "@mui/material";
import { useState } from "react"

const ResetPassword = () => {

  return (
    <Box margin="10px">
    <ToastContainer />
      <section className="min-h-svh mt-14">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
            <Typography 
              variant="h3" 
              className="text-[#1976d2] font-bold text-3xl"
              sx={{
                fontSize:"large"
              }}
            >
              Reset Password
            </Typography>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST">
            <div>
                <label 
                    htmlFor="oldPassword" 
                    className="block text-sm font-medium leading-6 text-gray-900">
                        Old Password
                </label>
                <div className="mt-2">
                    <input 
                    name="oldPassword" 
                    type="password" 
                    required
                    placeholder="Old password"
                    className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                </div>

                </div>
                <div>
                    <label 
                        htmlFor="newPassword" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        New Password
                    </label>
                    <div className="mt-2">
                    <input 
                        name="newPassword" 
                        type="password" 
                        required
                        placeholder="New password"
                        className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                    </div>
                </div>
                <div>
                    <label 
                        htmlFor="oldPassword" 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Old Password
                    </label>
                    <div className="mt-2">
                        <input 
                        name="oldPassword" 
                        type="password" 
                        required
                        placeholder="Old password"
                        className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                    </div>
                </div>
                <div>
                <Button 
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className="flex w-full justify-center px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                >
                    Reset
                </Button>
            </div>
          </form>
        </div>
      </section>

    </Box>
  )
}

export default ResetPassword