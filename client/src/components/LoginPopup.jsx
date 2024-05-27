import { useState } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import Modal from "./Modal";

const LoginPopup = ({ isOpen }) => {
  const [currState, setCurrState] = useState("sign-up");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ~ LoginPopup ~ data:", data);
  };

  return (
    <Modal
      isOpen={isOpen}
      bgClassName="flex items-center justify-center px-4"
      contentClassName="relative flex flex-col items-center bg-light-1 rounded-lg max-w-[450px] p-10 animate-fadeIn"
    >
      <button
        onClick={() => isOpen(false)}
        className="absolute top-2 right-2 sm:top-5 sm:right-5 p-2 rounded-full border hover:border-accent-1 transition-colors duration-300 ease-in-out cursor-pointer"
      >
        <IoClose />
      </button>
      <h1 className="text-lg text-center font-medium text-accent-1 mb-3">
        Welcome to Food Delivery
      </h1>
      <h2 className="text-2xl text-center font-medium mb-8">
        {currState === "sign-up"
          ? "Create an account to place your order"
          : "Log in to place your order"}
      </h2>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {currState === "sign-up" ? (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Name"
              required
              className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
            />
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email"
            required
            className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
            className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-lg border "
          />
        </div>
        <button className="mx-auto px-6 py-2 border rounded-full bg-accent-hover text-light-1 hover:border-accent-1 hover:bg-accent-1 transition-colors duration-300 ease-in-out">
          {currState === "sign-up" ? "Sign Up" : "Login"}
        </button>
        <div className="flex gap-4 text-sm mb-8">
          <input type="checkbox" name="condition" required className=" " />
          <p>By continuing, I agree to the Terms of use and Privacy policy</p>
        </div>
      </form>
      {currState === "sign-up" ? (
        <p className="text-center ">
          Alredy have an account?{" "}
          <span
            onClick={() => setCurrState("sign-in")}
            className="cursor-pointer font-semibold text-accent-1 hover:underline underline-custom"
          >
            Login
          </span>
        </p>
      ) : (
        <p className="text-center">
          Create a new account?{" "}
          <span
            onClick={() => setCurrState("sign-up")}
            className="cursor-pointer text-accent-1 hover:underline underline-custom"
          >
            Sign Up
          </span>
        </p>
      )}
    </Modal>
  );
};

LoginPopup.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default LoginPopup;
