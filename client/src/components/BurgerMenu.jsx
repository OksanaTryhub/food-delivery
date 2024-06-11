import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogin, getUserToken } from "../redux/auth/auth-selectors";
import { userLogout } from "./../redux/auth/auth-operations";

import Modal from "./Modal";

import { RiUserSettingsLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineShoppingCart, MdRestaurantMenu } from "react-icons/md";
import { IoClose, IoLogoOctocat } from "react-icons/io5";
import { TbShoppingBagCheck } from "react-icons/tb";

const BurgerMenu = ({ isOpen }) => {
  const token = useSelector(getUserToken);
  const isLogin = useSelector(isUserLogin);
  const dispatch = useDispatch();

  const handleShowLoginPopup = () => {
    console.log("CLICK on SIGN In button");
  };

  const handleLogout = () => {
    isOpen(false);
    dispatch(userLogout(token));
  };

  return (
    <Modal
      bgClassName=""
      contentClassName="absolute flex flex-col top-0 left-0 w-[300px] h-screen px-5 py-7"
      isOpen={isOpen}
    >
      <button
        onClick={() => isOpen(false)}
        className="absolute top-5 right-5 p-2 rounded-full border hover:border-accent-1 transition-colors duration-300 ease-in-out cursor-pointer"
      >
        <IoClose />
      </button>

      {isLogin ? (
        <div className="  bg-red-100 p-3 rounded-full text-3xl cursor-pointer mb-8 mr-auto">
          <IoLogoOctocat />
        </div>
      ) : (
        <button
          onClick={handleShowLoginPopup}
          className="flex px-6 py-2 mb-10 border rounded-full hover:border-accent-1 transition-colors duration-300 ease-in-out"
        >
          Sign In
        </button>
      )}

      <div className="flex flex-col gap-4 grow">
        <Link
          to="/"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-4 cursor-pointer hover:underline underline-custom"
        >
          <MdRestaurantMenu className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Menu</p>
        </Link>
        <Link
          to="/orders"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-4 cursor-pointer hover:underline underline-custom"
        >
          <TbShoppingBagCheck className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Orders</p>
        </Link>
        <Link
          to="/cart"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-4 cursor-pointer hover:underline underline-custom"
        >
          <MdOutlineShoppingCart className=" text-xl md:text-2xl group-hover:text-accent-1" />
          Cart
        </Link>
        <Link
          to="/profile"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-4 cursor-pointer hover:underline underline-custom"
        >
          <RiUserSettingsLine className=" text-xl md:text-2xl group-hover:text-accent-1" />
          Account settings
        </Link>
      </div>
      <button
        onClick={() => handleLogout()}
        className="group flex items-center gap-4 py-3 rounded-t-md cursor-pointer hover:underline underline-custom"
      >
        <LuLogOut className=" text-xl md:text-2xl group-hover:text-accent-1" />
        <p className=" md:text-lg">Log out</p>
      </button>
    </Modal>
  );
};

BurgerMenu.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default BurgerMenu;
