import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { userLogout } from "../redux/auth/auth-operations";
import { getUserToken } from "../redux/auth/auth-selectors";
import Modal from "./Modal";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { TbShoppingBagCheck } from "react-icons/tb";

const UserMenu = ({ isOpen }) => {
  const token = useSelector(getUserToken);
  const dispatch = useDispatch();
  const handleLogout = () => {
    isOpen(false);
    dispatch(userLogout(token));
  };

  return (
    <Modal
      bgClassName="bg-transparent"
      contentClassName="absolute top-[80px] right-2 border rounded-lg p-3"
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-4">
        <NavLink
          to="/orders"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-3 p-3 border-b rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <TbShoppingBagCheck className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Orders</p>
        </NavLink>
        <NavLink
          to="/profile"
          onClick={() => isOpen(false)}
          className="group flex items-center gap-3 p-3 border-b rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <RiUserSettingsLine className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Account settings</p>
        </NavLink>

        <button
          onClick={() => handleLogout()}
          className="group flex items-center gap-3 p-3 rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <LuLogOut className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg">Log out</p>
        </button>
      </div>
    </Modal>
  );
};

UserMenu.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default UserMenu;
