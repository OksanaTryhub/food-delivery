import PropTypes from "prop-types";
import Modal from "./Modal";
import { useEffect } from "react";

const DeleteFoodItemModal = ({ isOpen, item, handleDelete, handleCancel }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      bgClassName="flex items-center justify-center w-full h-screen"
      contentClassName="flex flex-col items-center gap-10 bg-light-1 rounded-lg w-[90%] max-w-[300px] p-6 animate-fadeIn"
    >
      <p className="font-medium text-center text-sm leading-10 md:text-base md:leading-10">
        <span className="text-accent-1 text-base md:text-lg font-semibold ">
          Warning!
        </span>
        <br />
        Are you sure you want to delete the <br />
        <span className="font-semibold text-lg md:text-xl">{item.name}?</span>
      </p>
      <div className="flex w-full justify-between ">
        <button
          className="font-medium px-6 py-2 border rounded-full hover:border-accent-1 hover:bg-red-50 transition-colors duration-300 ease-in-out"
          title="Update Food Item"
          onClick={handleCancel}
        >
          СANCEL
        </button>

        <button
          className="font-medium text-accent-1 px-6 py-2 border rounded-full hover:border-accent-1 hover:bg-accent-1 hover:text-inherit transition-colors duration-300 ease-in-out"
          onClick={handleDelete}
          title="Update Food Item"
        >
          DELETE
        </button>
      </div>
    </Modal>
  );
};

DeleteFoodItemModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
export default DeleteFoodItemModal;
