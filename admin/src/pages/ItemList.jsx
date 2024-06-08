import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFood, isError, isLoading } from "../redux/food/food-selectors";
import { fetchDeleteFoodItem, fetchFood } from "../redux/food/food-operations";

import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import EmptyList from "../components/EmptyList";
import Loader from "../components/Loader";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "../firebase";

const ItemList = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const foodList = useSelector(getFood);
  const loading = useSelector(isLoading);
  const error = useSelector(isError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFood());
    setDataFetched(true);
  }, [dispatch]);

  const updateFoodItem = async (id) => {
    console.log("🚀 ~ updateFoodItem ~ id:", id);
    // Add item update logic
    toast.warning("Coming soon there will be item update logic...");
  };

  const removeFoodItem = async (id) => {
    const imageDownloadURL = foodList.find((item) => item._id === id)?.image;
    //ADD MODAL WINDOW TO CONFIRM DELETION
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

  if (loading && !error) {
    return <Loader />;
  }

  return (
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
            foodList.map((item) => (
              <div key={item._id}>
                <div className="grid grid-cols-5 items-center text-center gap-1 p-3">
                  <div className="w-20 mx-auto">
                    <img src={item.image} alt="Food image" />
                  </div>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <div className="flex justify-between px-4">
                    <button
                      className=" flex hover:text-green-500 cursor-pointer justify-center "
                      onClick={() => updateFoodItem(item._id)}
                      title="Update Food Item"
                    >
                      <GrUpdate />
                    </button>
                    <button
                      className=" flex hover:text-accent-1 cursor-pointer justify-center "
                      onClick={() => removeFoodItem(item._id)}
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
  );
};

export default ItemList;
