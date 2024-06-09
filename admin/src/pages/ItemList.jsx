import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFood, isError, isLoading } from "../redux/food/food-selectors";
import {
  fetchDeleteFoodItem,
  fetchFood,
  fetchUpdateFoodItem,
} from "../redux/food/food-operations";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import EmptyList from "../components/EmptyList";
import Loader from "../components/Loader";
import FoodItemUpdateModal from "../components/FoodItemUpdateModal";

import { FaTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { toast } from "react-toastify";
import FoodItemDetails from "../components/FoodItemDetails";
import DeleteFoodItemModal from "../components/DeleteFoodItemModal";

const ItemList = () => {
  const foodList = useSelector(getFood);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);

  const [dataFetched, setDataFetched] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showItemDetailModal, setShowItemDetailModal] = useState(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [file, setFile] = useState();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads",
    image: "",
  });
  const dispatch = useDispatch();

  const sortedFoodList = [...foodList].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  useEffect(() => {
    dispatch(fetchFood());
    setDataFetched(true);
  }, [dispatch]);

  useEffect(() => {
    if (file) {
      handleImageUpload(file);
    }
  }, [file]);

  const updateFoodItem = async (id) => {
    setShowItemDetailModal(false);
    setShowUpdateModal(true);
    const foodItem = foodList.filter((item) => item._id === id);
    setData({
      id: foodItem[0]._id,
      name: foodItem[0].name,
      description: foodItem[0].description,
      price: +foodItem[0].price,
      category: foodItem[0].category,
      image: foodItem[0].image,
    });
  };

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + "_" + image.name;
    const storageRef = ref(storage, imageName);
    try {
      const uploadTask = uploadBytesResumable(storageRef, image);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      setData({ ...data, image: downloadURL });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(fetchUpdateFoodItem(data));
      if (response.payload.success) {
        toast.success(`Item updated successfully!`);
        setData({
          id: "",
          name: "",
          description: "",
          price: "",
          category: "Salads",
          image: "",
        });
        setFile();
        setShowUpdateModal(false);
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const showFoodItemDetails = (id) => {
    setShowItemDetailModal(true);
    const item = foodList.filter((item) => item._id === id);
    setSelectedItem(item[0]);
  };

  const removeFoodItem = async (id) => {
    setShowDeleteItemModal(false);
    setShowItemDetailModal(false);
    const imageDownloadURL = foodList.find((item) => item._id === id)?.image;

    dispatch(fetchDeleteFoodItem(id))
      .then((res) => {
        if (imageDownloadURL) {
          const storage = getStorage(app);
          const imageRef = ref(storage, imageDownloadURL);
          try {
            deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image from Firebase Storage:", error);
          }
        } else {
          console.log(
            "No image found for the food item to delete from Storage"
          );
        }

        toast.success(res.payload.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const showDeleteModal = (id) => {
    setShowDeleteItemModal(true);
    const item = foodList.filter((item) => item._id === id);
    setSelectedItem(item[0]);
  };

  const handleCancel = () => {
    setShowDeleteItemModal(false);
    setShowUpdateModal(false);
  };

  if (loading && !error) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Loader size="30" />
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="container flex flex-col items-center justify-between mx-auto p-3 pt-12">
          <p className="w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto text-2xl sm:text-3xl lg:text-4xl font-semibold text-center sm:text-start pl-3 mb-4">
            Food List
          </p>
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[75%] mx-auto ">
            <div className="grid grid-cols-5 items-center text-center gap-1 p-3 text-lg text-gray-400">
              <p>Image</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Actions</p>
            </div>
            <hr />

            {dataFetched && foodList.length > 0 ? (
              sortedFoodList.map((item) => (
                <div key={item._id}>
                  <div className="grid grid-cols-5 items-center text-center gap-1 p-3">
                    <div
                      className="w-20 mx-auto cursor-pointer hover:scale-110 transition-scale duration-300 ease-in-out rounded-sm overflow-hidden"
                      onClick={() => showFoodItemDetails(item._id)}
                    >
                      <img src={item.image} alt="Food image" />
                    </div>
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <div className="flex justify-between px-4">
                      <button
                        className=" flexcursor-pointer justify-center  "
                        onClick={() => updateFoodItem(item._id)}
                        title="Update Food Item"
                      >
                        <GrUpdate className="hover:text-green-500 hover:rotate-180 transition-rotate transition-color duration-500 ease-in-out" />
                      </button>
                      <button
                        className=" flex cursor-pointer justify-center hover:text-accent-1 transition-color duration-300 ease-in-out "
                        onClick={() => showDeleteModal(item._id)}
                        title="Delete Food Item"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <EmptyList />
            )}
          </div>
        </div>
      </section>

      {showUpdateModal ? (
        <FoodItemUpdateModal
          isOpen={setShowUpdateModal}
          itemImage={data.image}
          itemName={data.name}
          itemDescription={data.description}
          itemCategory={data.category}
          itemPrice={+data.price}
          handleSubmit={handleSubmit}
          onChangeHandler={onChangeHandler}
          handleFileChange={(e) => setFile(e.target.files[0])}
          handleCancel={handleCancel}
          file={file}
        />
      ) : (
        ""
      )}

      {showItemDetailModal ? (
        <FoodItemDetails
          isOpen={setShowItemDetailModal}
          item={selectedItem}
          updateFoodItem={() => updateFoodItem(selectedItem._id)}
          removeFoodItem={() => showDeleteModal(selectedItem._id)}
        />
      ) : (
        ""
      )}

      {showDeleteItemModal ? (
        <DeleteFoodItemModal
          isOpen={setShowDeleteItemModal}
          item={selectedItem}
          handleDelete={() => removeFoodItem(selectedItem._id)}
          handleCancel={handleCancel}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ItemList;
