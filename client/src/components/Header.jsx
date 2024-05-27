import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../assets/images/logo.png";
import LoginPopup from "./LoginPopup";
import BurgerMenu from "./BurgerMenu";
import { StoreContext } from "../context/StoreContext";

const Header = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const location = useLocation();
  const { getTotalCartAmount, getTotalItemsQuantity } =
    useContext(StoreContext);

  const handleShowBurger = () => {
    setShowBurger(true);
  };

  const handleShowLoginPopup = () => {
    setShowLoginPopup(true);
  };

  return (
    <>
      {showLoginPopup ? <LoginPopup isOpen={setShowLoginPopup} /> : ""}
      <header className="flex bg-light-1 shadow-md ">
        <div className="container flex items-center justify-between mx-auto p-3">
          <div className="pl-4">
            <Link to="/">
              <img src={logo} alt="logo" className="w-[60px] sm:w-20" />
            </Link>
          </div>
          <nav>
            {location.pathname === "/" && (
              <ul className="hidden md:flex gap-4 ">
                <Link
                  to="/"
                  className={`cursor-pointer hover:text-accent-1 ${
                    activeItem === "home" ? "underline underline-custom" : ""
                  }`}
                  onClick={() => setActiveItem("home")}
                >
                  Home
                </Link>
                <a
                  href="#explore-menu"
                  className={`cursor-pointer hover:text-accent-1 ${
                    activeItem === "menu" ? "underline underline-custom" : ""
                  }`}
                  onClick={() => setActiveItem("menu")}
                >
                  Menu
                </a>
                <a
                  href="#app-download"
                  className={`cursor-pointer hover:text-accent-1 ${
                    activeItem === "mobile-app"
                      ? "underline underline-custom"
                      : ""
                  }`}
                  onClick={() => setActiveItem("mobile-app")}
                >
                  Mobile App
                </a>
                <a
                  href="#footer"
                  className={`cursor-pointer hover:text-accent-1 ${
                    activeItem === "contact-us"
                      ? "underline underline-custom"
                      : ""
                  }`}
                  onClick={() => setActiveItem("contact-us")}
                >
                  Contact Us
                </a>
              </ul>
            )}
          </nav>
          <div className="flex gap-4 sm:gap-8 pr-4 items-center">
            <FaSearch className="text-[22px] cursor-pointer hover:text-accent-1" />
            <div className="relative">
              <Link to="/cart">
                <FaCartShopping className="text-2xl hover:text-accent-1" />
              </Link>
              <div
                className={`w-4 h-4 bg-accent-1 rounded-full -top-2 -right-2 absolute flex items-center justify-center text-[10px] ${
                  getTotalCartAmount() === 0 && "hidden"
                }`}
              >
                {getTotalItemsQuantity()}
              </div>
            </div>
            <button
              onClick={handleShowLoginPopup}
              className="hidden md:flex px-6 py-2 bg-white border rounded-full hover:border-accent-1 transition-colors duration-300 ease-in-out"
            >
              Sign In
            </button>
            <FaBars
              onClick={handleShowBurger}
              className="md:hidden cursor-pointer"
            />
          </div>
        </div>
      </header>
      {showBurger ? <BurgerMenu isOpen={setShowBurger} /> : ""}
    </>
  );
};

export default Header;
