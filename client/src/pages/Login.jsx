import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom"
import { useState } from "react"
// import Cookies from "universal-cookie"


// const displayLoginNotification = () => {
//   toast.success("LoggedIn Successful");
// };


const Login = () => {

  const loginBg = {
    backgroundImage: 'url("../src/assets/loginBg.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const[user, setUser] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  // const cookies = new Cookies();

  const handleSubmit = async (e) => {
      // setStatus(false)
      e.preventDefault();
      toast.success("LoggedIn Successful");

      try{
          await fetch("https://taskmasterapi.vercel.app/api/v1/users/login", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: user['email'],
                  password: user['password'].toString()
              })
              

          }).then((response) => response.json())
          .then((data) => {
              console.log(data)

              if(data.status !== "success"){
                toast.warn("Fill all required fields");
              }
              console.log(data.status)
              // cookies.set("TOKEN", data.data.token, {path: "/"})
              if(data.status === "success"){
                  setUser({
                      email: "",
                      password: ""
                  })

                  toast.success("LoggedIn Successful");
                  setTimeout(() => {
                      navigate("/task-overview")
                    }, 3000);

                  
              }
          })
      }catch(error){
          console.log(error.message)
      }
  }

  return (
    <>
    <ToastContainer />
      <section className="flex justify-between min-h-svh">
        
        <div className='w-1/2 bg-[#4291B0] md:block hidden' style={loginBg} >

        </div>

        <div className="flex flex-col justify-center w-full min-h-full px-6 py-12 md:w-1/2 lg:px-8">


        <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-[#4291B0] font-bold text-3xl">Welcome Back!</h1>
          <h2 className="mt-2 text-2xl font-bold text-gray-700">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-1">
            <input 
            id="email" 
            name="email" 
            type="email"
            required
            placeholder='Enter your email' 
            className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
          </div>
        </div>

            <div>
              <div className="flex items-center justify-between">
                <label 
                htmlFor="password" 
                className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#4291B0] hover:text-[#4291B0]">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" 
                name="password" 
                type="password" 
                required
                placeholder="Enter your password"
                className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
              </div>
            </div>

            <div>
            <button 
            type="submit" 
            // onClick={displayLoginNotification}
            className="flex w-full justify-center rounded-md bg-[#4291B0] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]">
            Login
          </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
        Don{"'"}t have an account?
        <Link to="/register" className="font-semibold leading-6 text-[#4291B0] hover:text-[#4291B0] ml-2">Sign up</Link>
      </p>
        </div>
        
       </div>
      </section>

    </>
  )
}

export default Login