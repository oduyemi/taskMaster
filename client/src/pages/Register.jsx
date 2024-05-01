import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Typography } from '@mui/material';


const displayLoginNotification = () => {
  toast.success("Registration Successful");
};


const Register = () => {

    return (
        <Box margin="10px">
            <ToastContainer />
              <section className="min-h-svh mt-14">
                <Box className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
                  <Typography 
                    variant="h3" 
                    className="text-[#1976d2] font-bold text-3xl"
                    sx={{
                      fontSize:"larger"
                    }}
                  >
                    Create An Account
                  </Typography>
                </Box>

                <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST">
                    <Box>
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Create Username</label>
                      <Box className="mt-1">
                        <input 
                        name="username" 
                        type="text"  
                        required
                        placeholder='Create Username' 
                        className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                      </Box>
                    </Box>

                    <Box>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                      <Box className="mt-1">
                        <input 
                        name="email" 
                        type="email"
                        required
                        placeholder='Enter your email' 
                        className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                      </Box>
                    </Box>

                    <Box>
                      <Box className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      </Box>

                      <Box className="mt-1">
                        <Box className="relative">
                          <input 
                            name="password"  
                            required
                            placeholder="Enter your password"
                            className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                        
                          <Box className="text-[#4291B0] absolute inset-y-0 right-0 p-2 text-sm flex items-center cursor-pointer" >
                          </Box>
                        </Box>
                      </Box>

                      <Box className="mt-3 flex items-center justify-between">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                      </Box>

                      <Box className="mt-1">
                        <Box className="relative">
                          <input 
                            name="Confirmassword"  
                            required
                            placeholder="Enter your password"
                            className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
                        
                          <Box className="text-[#4291B0] absolute inset-y-0 right-0 p-2 text-sm flex items-center cursor-pointer" >
                          </Box>
                        </Box>
                      </Box>

                    </Box>

                    <Box>
                      <Button 
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={displayLoginNotification}
                        className="flex w-full justify-center px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                      >
                          Register
                      </Button>
                    </Box>
                  </form>

                  <p className="mt-6 text-sm text-center text-gray-500">
                    Already have an account?
                    <Link to="/login" className="font-semibold leading-6 text-[#4291B0] hover:text-[#4291B0] ml-2">Login</Link>
                  </p>
                </Box>
              {/* </Box> */}

            </section>
        </Box>
  )
}

export default Register