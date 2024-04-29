import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";


const displayLoginNotification = () => {
  toast.success("Registration Successful");
};


const Register = () => {

  const regBg = {
    backgroundImage: 'url("../src/assets/regBg.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>

      <ToastContainer />
      <section className="flex justify-between min-h-svh">
      <div style={regBg} className="bg-[#4291B0] items-center justify-center hidden min-h-full md:w-1/2 md:flex ">

      </div>
  <div className="flex flex-col justify-center w-full min-h-full px-6 py-12 md:w-1/2 lg:px-8">

    <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
{/* <!--      <img className="w-auto h-10 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">--> */}

      <h1 className="text-[#4291B0] font-bold text-3xl">Create An Account!</h1>
      <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up with Email</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
          <div className="mt-1">
            <input 
            id="firstName" 
            name="firstName" 
            type="text"  
            required
            placeholder='Enter first name' 
            className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
          <div className="mt-1">
            <input 
            id="lastName" 
            name="lastName" 
            type="text"  
            required
            placeholder='Enter last name' 
            className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
          </div>
        </div>

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
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>

          <div className="mt-1">
            <div className="relative">
              <input 
                id="password" 
                name="password"  
                required
                placeholder="Enter your password"
                className="px-3 block w-full rounded-md py-2 text-gray-800 shadow-sm border border-[#4291B0] sm:text-sm sm:leading-6 outline-none" />
            
              <div className="text-[#4291B0] absolute inset-y-0 right-0 p-2 text-sm flex items-center cursor-pointer" >
              </div>
            </div>
          </div>

        </div>

        <div>
          <button 
            type="submit"
            onClick={displayLoginNotification}
            className="flex w-full justify-center rounded-md bg-[#4291B0] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]">
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        Already have an account?
        <Link to="/login" className="font-semibold leading-6 text-[#4291B0] hover:text-[#4291B0] ml-2">Login</Link>
      </p>
    </div>
  </div>

</section>


    </>
  )
}

export default Register