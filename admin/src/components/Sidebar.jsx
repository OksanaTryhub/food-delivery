import { MdFormatListBulleted, MdFormatListBulletedAdd } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="relative container">
      <div className="flex gap-5 border-b xs:hidden bg-white fixed top-[105px] w-full pt-5">
        <NavLink
          to="/admin/add"
          title="Add Items"
          className={({ isActive }) =>
            `group flex items-center justify-center gap-3 p-3 ml-10 border border-b-transparent rounded-t-md  bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-b-2  border-b-white -mb-px z-20" : ""
            }`
          }
        >
          <MdFormatListBulletedAdd className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
        </NavLink>
        <NavLink
          to="/admin/list"
          title="Items List"
          className={({ isActive }) =>
            `group flex items-center justify-center gap-3 p-3 border border-b-transparent rounded-t-md  bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-b-2  border-b-white -mb-px z-20" : ""
            }`
          }
        >
          <MdFormatListBulleted className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
        </NavLink>
        <NavLink
          to="/admin/orders"
          title="Orders"
          className={({ isActive }) =>
            `group flex items-center justify-center gap-3 p-3 border border-b-transparent rounded-t-md  bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-b-2  border-b-white -mb-px z-20" : ""
            }`
          }
        >
          <BsCardChecklist className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
        </NavLink>
      </div>
      <div className="hidden xs:flex fixed top-[105px] h-full flex-col pt-12 sm:pl-8 gap-5 border-r">
        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-transparent rounded-l-md ml-auto md:ml-0 bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-r-2  border-r-white -mr-px z-20" : ""
            }`
          }
        >
          <MdFormatListBulletedAdd className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
          <p className="hidden md:flex text-sm lg:text-lg font-medium ">
            Add Items
          </p>
        </NavLink>
        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-transparent rounded-l-md ml-auto md:ml-0 bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-r-2  border-r-white -mr-px z-20" : ""
            }`
          }
        >
          <MdFormatListBulleted className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
          <p className="hidden md:flex text-sm lg:text-lg font-medium">
            Items List
          </p>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-transparent rounded-l-md ml-auto md:ml-0 bg-gray-100 cursor-pointer hover:underline underline-custom ${
              isActive ? "bg-white border-r-2  border-r-white -mr-px z-20" : ""
            }`
          }
        >
          <BsCardChecklist className=" text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1" />
          <p className="hidden md:flex text-sm lg:text-lg font-medium">
            Orders
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
