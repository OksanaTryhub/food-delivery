import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchAddFoodItem } from "../redux/food/food-operations";
import { toast } from "react-toastify";

//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')

const AddItem = () => {
  const [file, setFile] = useState(false);
  // const [imageUploadPerc, setImageUploadPerc] = useState(0);
  // const [imageUploadError, setImageUploadError] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads",
    image: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleImageUpload(file);
    }
  }, [file]);

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // setImageUploadPerc(Math.round(progress));
      },
      (error) => {
        toast.error(error.message);
        // setImageUploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setData({ ...data, image: downloadURL })
        );
      }
    );
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchAddFoodItem(data))
      .then((res) => {
        if (res.payload.success) {
          toast.success(res.payload.message);
          setData({
            name: "",
            description: "",
            price: "",
            category: "Salads",
            image: "",
          });
          setFile(false);
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section>
      <div className="container flex items-center justify-between mx-auto p-3 pt-12">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col w-full sm:w-[85%] md:w-[80%] lg:w-[75%] mx-auto gap-5"
        >
          <div className="flex flex-col gap-2">
            <p className="font-medium">Upload image</p>
            <label
              htmlFor="image"
              className="flex flex-col max-w-[220px] items-center justify-center bg-gray-100 cursor-pointer text-gray-400 font-semibold"
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Item image"
                  className="max-w-[220px}"
                />
              ) : (
                <div className="flex flex-col max-w-[220px] items-center justify-center h-40">
                  <FaCloudUploadAlt className="text-4xl  text-gray-400" />
                  Upload
                </div>
              )}
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Product name"
              className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="6"
              placeholder="Product description"
              className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 mb-10">
            <div className="flex flex-col max-w-[220px] sm:flex-1 sm:max-w-none ">
              <p className="font-medium">Product category</p>
              <select
                onChange={onChangeHandler}
                value={data.category}
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
              <p className="font-medium">Product price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="Number"
                name="price"
                placeholder="$20"
                className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
              />
            </div>
          </div>
          <button className="font-medium mx-auto px-6 py-2 border rounded-full hover:border-accent-1 hover:bg-red-50 transition-colors duration-300 ease-in-out">
            ADD ITEM
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddItem;
