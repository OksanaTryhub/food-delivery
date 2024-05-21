import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className='flex bg-light-1 shadow-md '>
      <div className='container flex items-center justify-between mx-auto p-3'>
        <div className='pl-4'>
          <Link to='/' className='flex flex-col items-center'>
            <img src={logo} alt='logo' className='w-[60px] sm:w-16' />
            <p className='font-medium mt-2'>Admin Panel</p>
          </Link>
        </div>

        <div className='flex gap-4 sm:gap-8 pr-4 items-center'>
          <div className='bg-red-100 p-3 rounded-full text-3xl'>
            <FaUserAstronaut />
          </div>
          <FaBars className='md:hidden cursor-pointer' />
        </div>
      </div>
    </header>
  );
};

export default Header;
