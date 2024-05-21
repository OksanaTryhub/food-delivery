import { MdFormatListBulleted, MdFormatListBulletedAdd } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='flex flex-col pt-12 gap-5 border-r'>
      <NavLink
        to='/add'
        className={({ isActive }) =>
          `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-0 rounded-l-md ml-auto md:ml-0 cursor-pointer hover:underline underline-custom ${
            isActive ? "bg-red-50" : ""
          }`
        }
      >
        <MdFormatListBulletedAdd className=' text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1' />
        <p className='hidden md:flex text-sm lg:text-lg font-medium '>Add Items</p>
      </NavLink>
      <NavLink
        to='/list'
        className={({ isActive }) =>
          `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-0 rounded-l-md ml-auto md:ml-0 cursor-pointer hover:underline underline-custom ${
            isActive ? "bg-red-50" : ""
          }`
        }
      >
        <MdFormatListBulleted className=' text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1' />
        <p className='hidden md:flex text-sm lg:text-lg font-medium'>Items List</p>
      </NavLink>
      <NavLink
        to='/orders'
        className={({ isActive }) =>
          `group flex items-center justify-center md:justify-start gap-3 p-3 border border-r-0 rounded-l-md ml-auto md:ml-0 cursor-pointer hover:underline underline-custom ${
            isActive ? "bg-red-50" : ""
          }`
        }
      >
        <BsCardChecklist className=' text-3xl md:text-2xl lg:text-3xl group-hover:text-accent-1' />
        <p className='hidden md:flex text-sm lg:text-lg font-medium'>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
