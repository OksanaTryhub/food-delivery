import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, bgClassName, contentClassName, children }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        isOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      isOpen(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`absolute top-0 right-0 w-screen h-screen bg-dark-popup z-[100] ${bgClassName}`}
    >
      <div
        className={`className bg-light-1 rounded-lg animate-fadeIn ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.func,
  bgClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
