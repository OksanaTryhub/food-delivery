import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import EmptyList from "../components/EmptyList";
import Loader from "../components/Loader";

const ItemList = () => {
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/food/foodlist`);

        if (res.data.success) {
          setList(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchList();
    setLoading(false);
  }, [list]);

  const removeFoodItem = async (id) => {
    //ADD MODAL WINDOW TO CONFIRM DELETION
    const res = await axios.delete(`/api/food/delete/${id}`);

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

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

          {list && list.length > 0 ? (
            list.map((item) => (
              <div key={item._id}>
                <div className='grid grid-cols-5 items-center text-center gap-1 p-3'>
                  <div className='w-20 mx-auto'>
                    <img src={`${url}/images/` + item.image} alt='Food image' />
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
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemList;
