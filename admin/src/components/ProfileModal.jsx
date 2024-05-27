import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { FaListCheck } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import PropTypes from "prop-types";

const ProfileModal = ({ isOpen }) => {
  return (
    <Modal
      bgClassName="bg-transparent"
      contentClassName="absolute top-[95px] right-0 border rounded-lg p-3"
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-4">
        <NavLink
          to="/admin/list"
          className="group flex items-center gap-3 p-3 border-b rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <FaListCheck className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Added Items</p>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className="group flex items-center gap-3 p-3 border-b rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <RiUserSettingsLine className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg"> Account settings</p>
        </NavLink>

        <button
          onClick={() => isOpen(false)}
          className="group flex items-center gap-3 p-3 rounded-t-md cursor-pointer hover:underline underline-custom"
        >
          <LuLogOut className=" text-xl md:text-2xl group-hover:text-accent-1" />
          <p className=" md:text-lg">Log out</p>
        </button>
      </div>
    </Modal>
  );
};

ProfileModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default ProfileModal;
