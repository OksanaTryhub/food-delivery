import Modal from "./Modal";

import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BurgerMenu = ({ isOpen }) => {
  const handleShowLoginPopup = () => {
    console.log("CLICK on SIGN In button");
  };
  return (
    <Modal
      bgClassName=''
      contentClassName='absolute top-0 left-0 w-[300px] h-screen p-5 pt-7'
      isOpen={isOpen}
    >
      <button
        onClick={() => isOpen(false)}
        className='absolute top-5 right-5 p-2 rounded-full border hover:border-accent-1 transition-colors duration-300 ease-in-out cursor-pointer'
      >
        <IoClose />
      </button>
      <button
        onClick={handleShowLoginPopup}
        className='flex px-6 py-2 mb-10 border rounded-full hover:border-accent-1 transition-colors duration-300 ease-in-out'
      >
        Sign In
      </button>
      <ul className='flex flex-col gap-4'>
        <Link
          to='/'
          onClick={() => isOpen(false)}
          className='group cursor-pointer hover:underline underline-custom'
        >
          Home
        </Link>
        <Link
          to='/order'
          onClick={() => isOpen(false)}
          className='cursor-pointer hover:underline underline-custom'
        >
          Order
        </Link>
        <Link
          to='/cart'
          onClick={() => isOpen(false)}
          className='cursor-pointer hover:underline underline-custom'
        >
          Cart
        </Link>
      </ul>
    </Modal>
  );
};

BurgerMenu.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default BurgerMenu;
