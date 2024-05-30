import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAdminLogin } from "../redux/auth/auth-selectors";
import ProfileModal from "./ProfileModal";

import { FaUserAstronaut } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const isLogin = useSelector(isAdminLogin);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <header className='flex bg-light-1 shadow-md '>
        <div className='container relative flex items-center justify-between mx-auto p-3'>
          {showModal ? <ProfileModal isOpen={setShowModal} /> : ""}
          <div className='pl-4'>
            <Link to='/admin' className='flex flex-col items-center'>
              <img src={logo} alt='logo' className='w-[60px] sm:w-16' />
              <p className='font-medium mt-2'>Admin Panel</p>
            </Link>
          </div>

          <div className='flex gap-4 sm:gap-8 pr-4 items-center'>
            {isLogin && (
              <button onClick={handleShowModal} className='bg-red-100 p-3 rounded-full text-3xl'>
                <FaUserAstronaut />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
