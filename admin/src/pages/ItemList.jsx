import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getFood, isError, isLoading } from "../redux/food/food-selectors";
import { fetchFood } from "../redux/food/food-operations";

import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import EmptyList from "../components/EmptyList";
import Loader from "../components/Loader";

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
    //ADD MODAL WINDOW TO CONFIRM DELETION
    const res = await axios.delete(`/api/food/delete/${id}`);

    if (res.data.success) {
      dispatch(fetchFood());
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
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
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto ">
          <div className="grid grid-cols-5 items-center text-center gap-1 p-3 text-lg text-gray-400">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Actions</p>
          </div>
          <hr />

          {dataFetched && foodList.length === 0 ? (
            <EmptyList />
          ) : (
            foodList.map((item) => (
              <div key={item._id}>
                <div className="grid grid-cols-5 items-center text-center gap-1 p-3">
                  <div className="w-20 mx-auto">
                    {/* <img src={`${url}/images/` + item.image} alt='Food image' /> */}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemList;
