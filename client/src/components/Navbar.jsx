
function Navbar() {
  return (
    <nav className="p-4 bg-[#4291B0]">
      <div className="container flex items-center justify-between mx-auto md:w-[90%]">
        {/* Logo */}
        <div className="flex items-center">
          <img src="../src/assets/logo.png" alt="Logo" className="w-auto h-8" />
          <span className="ml-2 text-lg font-semibold text-white">TaskMaster</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center">
          <a href="/register" className="px-4 py-2 mr-4 text-white rounded-xl bg-slate-400 hover:text-gray-300">Create Account</a>
          <a href="/login" className="text-white hover:text-gray-300">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
