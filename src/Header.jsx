import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.jpg";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "./Redux/Slices/modeSlice";
import { setLoggedIn, setLoggedOut } from "./Redux/Slices/userSlice";
import LoginModal from "./LoginModal"; // Import the LoginModal component
import { LoginSharp } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // State to manage login modal visibility
  const darkMode = useSelector((state) => state.mode);
  const isLoggedIn = useSelector((state) => state.user.loggedstate);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleMode());
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true); // Open the login modal when login icon is clicked
  };

  const handleLogout = () => {
    dispatch(setLoggedOut()); // Dispatch action to set logged out state
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false); // Close the login modal
  };

  return (
    <div
      className={`flex items-center justify-between p-4 md:p-6 shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Logo and E-Shop (Hidden on Smaller Screens) */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Display Logo only */}
        <Link to={"/"} className="flex items-center space-x-2">
          <img
            className="h-10 w-10 md:h-12 md:w-12 rounded-full"
            src={Logo}
            alt="Logo"
          />
          {/* Hide E-Shop text on smaller screens */}
          <h1
            className={`text-lg md:text-xl font-bold hidden sm:block ${
              darkMode ? "text-white" : ""
            }`}
          >
            E-Shop
          </h1>
        </Link>
      </div>

      {/* Category Menu (Hidden on Larger Screens) */}
      <div className="md:hidden flex items-center">
        <IconButton
          style={{ color: darkMode ? "#ffffff" : "black" }}
          aria-label="menu"
          onClick={handleMenuToggle}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      {/* Category Links (Visible on Larger Screens) */}
      <div className="hidden md:flex justify-center space-x-6 text-gray-600">
        <Link
          to={"/electronics"}
          className={`hover:text-blue-500 transition duration-300 ${
            darkMode ? "text-white" : ""
          }`}
        >
          Electronics
        </Link>
        <Link
          to={"/sports"}
          className={`hover:text-blue-500 transition duration-300 ${
            darkMode ? "text-white" : ""
          }`}
        >
          Sports
        </Link>
        <Link
          to={"/kitchen"}
          className={`hover:text-blue-500 transition duration-300 ${
            darkMode ? "text-white" : ""
          }`}
        >
          Kitchen
        </Link>
        <Link
          to={"/clothing"}
          className={`hover:text-blue-500 transition duration-300 ${
            darkMode ? "text-white" : ""
          }`}
        >
          Clothing
        </Link>
      </div>

      {/* Search Bar (Adjust Width Responsively) */}
      <div className="flex w-48 sm:w-64 mx-2 md:mx-4">
        <input
          type="text"
          placeholder="Search"
          className={`w-full px-3 py-2 border ${
            darkMode ? "border-gray-600" : "border-gray-300"
          } rounded-lg focus:outline-none focus:border-blue-500`}
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <Link to="/cart">
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="shopping cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        {isLoggedIn ? (
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="account"
            onClick={handleLogout}
          >
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <IconButton
            style={{ color: darkMode ? "#ffffff" : "black" }}
            aria-label="login"
            onClick={handleLoginClick} // Open login modal on click
          >
            <LoginSharp />
          </IconButton>
        )}
        {/* Toggle dark mode icon based on darkMode state */}
        <IconButton
          style={{ color: darkMode ? "#ffffff" : "black" }}
          aria-label="dark mode"
          onClick={handleDarkModeToggle}
        >
          <DarkModeIcon />
        </IconButton>
      </div>

      {/* Collapsible Category Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 z-10 bg-white shadow-lg rounded-lg p-4">
          <Link
            to={"/electronics"}
            className={`block py-2 hover:text-blue-500 transition duration-300 ${
              darkMode ? "text-black" : ""
            }`}
          >
            Electronics
          </Link>
          <Link
            to={"/sports"}
            className={`block py-2 hover:text-blue-500 transition duration-300 ${
              darkMode ? "text-black" : ""
            }`}
          >
            Sports
          </Link>
          <Link
            to={"/kitchen"}
            className={`block py-2 hover:text-blue-500 transition duration-300 ${
              darkMode ? "text-black" : ""
            }`}
          >
            Kitchen
          </Link>
          <Link
            to={"/clothing"}
            className={`block py-2 hover:text-blue-500 transition duration-300 ${
              darkMode ? "text-black" : ""
            }`}
          >
            Clothing
          </Link>
        </div>
      )}

      {/* Render Login Modal */}
      <LoginModal open={loginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};

export default Header;
