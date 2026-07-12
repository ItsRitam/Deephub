import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeTogleBtn from "./ThemeTogleBtn";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // <-- Added useNavigate
import { User, ChevronDown, LayoutDashboard, LogOut } from "lucide-react"; 

// <-- Added setUser as a prop
const Navbar = ({ theme, setTheme, user, setUser }) => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // <-- Initialize navigate

  const handleLogout = () => {
    setDropdownOpen(false);
    
    // 1. Clear the browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. Update the app state to instantly show the "Log in" button
    if (setUser) {
      setUser(null);
    }
    
    // 3. Redirect back to the homepage
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70 relative"
    >
      
      <Link to="/" className="shrink-0">
        <img
          src={theme === "dark" ? assets.logo_dark : assets.logo}
          className="w-28 sm:w-32 md:w-40"
          alt="Deephub Logo"
        />
      </Link>

      <div
        className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ? "max-sm:w-0 overflow-hidden" : "max-sm:w-60 max-sm:pl-10"} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt="Close Menu"
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={() => setsidebarOpen(false)}
        />

        <Link
          onClick={() => setsidebarOpen(false)}
          to="/"
          className="sm:hover:border-b"
        >
          Home
        </Link>
        <a
          onClick={() => setsidebarOpen(false)}
          href="/#services"
          className="sm:hover:border-b"
        >
          Services
        </a>
        <a
          onClick={() => setsidebarOpen(false)}
          href="/#our-work"
          className="sm:hover:border-b"
        >
          Our Work
        </a>
        <a
          onClick={() => setsidebarOpen(false)}
          href="/#contact-us"
          className="sm:hover:border-b"
        >
          Contact Us
        </a>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        
        {user ? (
          <div className="relative">
            
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 border border-gray-200 dark:border-gray-700 rounded-full py-1 sm:py-1.5 pl-1 sm:pl-1.5 pr-2 sm:pr-3 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-[#5044E5] dark:text-blue-400 shrink-0">
                {user.profile_photo ? (
                  <img 
                    src={user.profile_photo} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                )}
              </div>
              
              <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide max-w-[60px] sm:max-w-[120px] truncate pl-0.5">
                Hi! {user.name}
              </span>

              <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </div>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="py-1.5">
                      <Link 
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        Dashboard
                      </Link>
                      
                      <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-700 my-1"></div>
                      
                      {/* --- UPDATED LOGOUT BUTTON --- */}
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500 dark:text-red-400" />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/auth" 
            className="text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all"
          >
            Sign up/Log in
            <img src={assets.arrow_icon} width={14} alt="" />
          </Link>
        )}

        <ThemeTogleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt="Menu"
          onClick={() => setsidebarOpen(true)}
          className="w-7 sm:w-8 sm:hidden cursor-pointer"
        />

      </div>
    </motion.div>
  );
};

export default Navbar;