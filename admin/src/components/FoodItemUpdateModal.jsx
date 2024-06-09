import Modal from "./Modal";
import PropTypes from "prop-types";
import { useEffect } from "react";

const FoodItemUpdateModal = ({
  isOpen,
  itemImage,
  itemName,
  itemDescription,
  itemPrice,
  itemCategory,
  handleSubmit,
  onChangeHandler,
  file,
  handleFileChange,
  handleCancel,
}) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      bgClassName="flex items-center justify-center p-4"
      contentClassName="overflow-y-auto flex flex-col items-center bg-light-1 rounded-lg w-full max-w-[380px] lg:max-w-[550px] max-h-[95%] p-4 animate-fadeIn"
    >
      <div className="container flex items-center justify-between mx-auto ">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-2">
            <div className="lg:flex flex-row-reverse gap-8">
              <p className="font-medium lg:mr-auto lg:text-lg">Upload image</p>
              <label
                htmlFor="image"
                className="flex flex-col max-w-[220px] lg:max-w-[300px] items-center justify-center bg-gray-100 cursor-pointer text-gray-400 font-semibold"
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Item image"
                    className="max-w-[220px}"
                  />
                ) : (
                  <img
                    src={itemImage}
                    alt="Item image"
                    className="max-w-[220px}"
                  />
                )}
              </label>
            </div>
            <input type="file" id="image" onChange={handleFileChange} hidden />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium lg:text-lg">Product name</p>
            <input
              onChange={onChangeHandler}
              value={itemName}
              type="text"
              name="name"
              placeholder="Product name"
              className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium lg:text-lg">Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={itemDescription}
              name="description"
              rows="4"
              placeholder="Product description"
              className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 mb-2">
            <div className="flex flex-col max-w-[220px] sm:flex-1 sm:max-w-none ">
              <p className="font-medium lg:text-lg">Product category</p>
              <select
                onChange={onChangeHandler}
                value={itemCategory}
                name="category"
                className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
              >
                <option value="Salads">Salads</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="Cakes">Cakes</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="flex flex-col max-w-[220px] sm:flex-1 sm:max-w-none">
              <p className="font-medium lg:text-lg">Product price</p>
              <input
                onChange={onChangeHandler}
                value={itemPrice}
                type="Number"
                name="price"
                placeholder="$20"
                className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
              />
            </div>
          </div>
          <div className="flex justify-between w-full pt-8">
            <button
              className="font-medium px-4 py-2 border rounded-full hover:border-accent-1 hover:bg-red-50 transition-colors duration-300 ease-in-out"
              title="Update Food Item"
              type="button"
              onClick={handleCancel}
            >
              СANCEL
            </button>
            <button className="font-medium  px-4 py-2 border rounded-full hover:border-accent-1 hover:bg-red-50 transition-colors duration-300 ease-in-out">
              UPDATE ITEM
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

FoodItemUpdateModal.propTypes = {
  isOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  itemImage: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemDescription: PropTypes.string.isRequired,
  itemCategory: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  file: PropTypes.object,
};
export default FoodItemUpdateModal;
