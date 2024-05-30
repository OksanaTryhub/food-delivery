import { useEffect, useState } from "react";
import axios from "axios";

import { getFood, isError, isLoading } from "../redux/food/food-selectors";
import { fetchFood } from "../redux/food/food-operations";

import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import EmptyList from "../components/EmptyList";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";

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
      <div className='container flex flex-col items-center justify-between mx-auto p-3 pt-12'>
        <p className='w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto text-2xl sm:text-3xl lg:text-4xl font-semibold text-center sm:text-start pl-3 mb-4'>
          Food List
        </p>
        <div className='w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto '>
          <div className='grid grid-cols-5 items-center text-center gap-1 p-3 text-lg text-gray-400'>
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          <hr />

          {dataFetched && foodList.length === 0 ? (
            <EmptyList />
          ) : (
            foodList.map((item) => (
              <div key={item._id}>
                <div className='grid grid-cols-5 items-center text-center gap-1 p-3'>
                  <div className='w-20 mx-auto'>
                    {/* <img src={`${url}/images/` + item.image} alt='Food image' /> */}
                    <img src={item.image} alt='Food image' />
                  </div>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                  <button
                    className=' flex hover:text-accent-1 cursor-pointer justify-center '
                    onClick={() => removeFoodItem(item._id)}
                  >
                    <FaTrashCan />
                  </button>
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
