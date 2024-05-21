import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const AddItem = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads",
  });

  const onChengeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const res = await axios.post("/api/food/add", formData);
    if (res.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salads",
      });
      setImage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <section>
      <div className='container flex items-center justify-between mx-auto p-3 pt-12'>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto gap-5'
        >
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Upload image</p>
            <label
              htmlFor='image'
              className='flex flex-col max-w-[220px] items-center justify-center bg-gray-100 cursor-pointer text-gray-400 font-semibold'
            >
              {image ? (
                <img src={URL.createObjectURL(image)} alt='Item image' className='max-w-[220px}' />
              ) : (
                <div className='flex flex-col max-w-[220px] items-center justify-center h-40'>
                  <FaCloudUploadAlt className='text-4xl  text-gray-400' />
                  Upload
                </div>
              )}
            </label>
            <input
              type='file'
              id='image'
              onChange={(e) => setImage(e.target.files[0])}
              hidden
              required
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Product name</p>
            <input
              onChange={onChengeHandler}
              value={data.name}
              type='text'
              name='name'
              placeholder='Product name'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border '
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-medium'>Product description</p>
            <textarea
              onChange={onChengeHandler}
              value={data.description}
              name='description'
              rows='6'
              placeholder='Product description'
              className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border '
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 lg:gap-10 mb-10'>
            <div className='flex flex-col max-w-[220px] sm:flex-1 sm:max-w-none '>
              <p className='font-medium'>Product category</p>
              <select
                onChange={onChengeHandler}
                value={data.category}
                name='category'
                className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border '
              >
                <option value='Salads'>Salads</option>
                <option value='Rolls'>Rolls</option>
                <option value='Deserts'>Deserts</option>
                <option value='Sandwiches'>Sandwiches</option>
                <option value='Cakes'>Cakes</option>
                <option value='Pure Veg'>Pure Veg</option>
                <option value='Pasta'>Pasta</option>
                <option value='Noodles'>Noodles</option>
              </select>
            </div>
            <div className='flex flex-col max-w-[220px] sm:flex-1 sm:max-w-none'>
              <p className='font-medium'>Product price</p>
              <input
                onChange={onChengeHandler}
                value={data.price}
                type='Number'
                name='price'
                placeholder='$20'
                className='focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border '
              />
            </div>
          </div>
          <button className='font-medium mx-auto px-6 py-2 border rounded-full hover:border-accent-1 hover:bg-red-50 transition-colors duration-300 ease-in-out'>
            ADD ITEM
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddItem;
