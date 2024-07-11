import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.jpg";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toggleMode } from "./Redux/Slices/modeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 md:p-6 shadow-lg bg-white">
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
          <h1 className="text-lg md:text-xl font-bold hidden sm:block">
            E-Shop
          </h1>
        </Link>
      </div>

      {/* Category Menu (Hidden on Larger Screens) */}
      <div className="md:hidden flex items-center">
        <IconButton
          color="inherit"
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
          className="hover:text-blue-500 transition duration-300"
        >
          Electronics
        </Link>
        <Link
          to={"/sports"}
          className="hover:text-blue-500 transition duration-300"
        >
          Sports
        </Link>
        <Link
          to={"/kitchen"}
          className="hover:text-blue-500 transition duration-300"
        >
          Kitchen
        </Link>
        <Link
          to={"/clothing"}
          className="hover:text-blue-500 transition duration-300"
        >
          Clothing
        </Link>
      </div>

      {/* Search Bar (Adjust Width Responsively) */}
      <div className="flex w-48 sm:w-64 mx-2 md:mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <IconButton color="inherit" aria-label="shopping cart">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="account">
          <AccountCircleIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="dark mode"
          onClick={() => {
            dispatch(toggleMode());
          }}
        >
          <Brightness4Icon />
        </IconButton>
      </div>

      {/* Collapsible Category Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 z-10 bg-white shadow-lg rounded-lg p-4">
          <Link
            to={"/electronics"}
            className="block py-2 hover:text-blue-500 transition duration-300"
          >
            Electronics
          </Link>
          <Link
            to={"/sports"}
            className="block py-2 hover:text-blue-500 transition duration-300"
          >
            Sports
          </Link>
          <Link
            to={"/kitchen"}
            className="block py-2 hover:text-blue-500 transition duration-300"
          >
            Kitchen
          </Link>
          <Link
            to={"/clothing"}
            className="block py-2 hover:text-blue-500 transition duration-300"
          >
            Clothing
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
