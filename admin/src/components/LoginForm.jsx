import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, isError } from "../redux/auth/auth-selectors.js";
import { adminSignup, adminLogin } from "../redux/auth/auth-operations.js";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const error = useSelector(isError);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTabChange = (e) => {
    setActiveTab(e.target.name);
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (activeTab === "login") {
        dispatch(adminLogin({ email: data.email, password: data.password }));
      } else if (activeTab === "create") {
        dispatch(adminSignup(data));
      } else if (activeTab === "reset") {
        console.log("RESET PASSWORD");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex flex-col mx-auto p-3">
      <div className="flex gap-1">
        <button
          name="login"
          className={`px-4 py-2 border border-b-transparent rounded-t-md bg-gray-200 ${
            activeTab === "login" &&
            "bg-white border-b-2  border-b-white -mb-px z-20"
          }`}
          onClick={handleTabChange}
        >
          Log In
        </button>
        <button
          name="create"
          className={`px-4 py-2 border rounded-t-md bg-gray-200 ${
            activeTab === "create" &&
            "bg-white border-b-2 border-b-white -mb-px z-20"
          }`}
          onClick={handleTabChange}
        >
          Create new account
        </button>
        <button
          name="reset"
          className={`px-4 py-2 border border-b-transparent rounded-t-md bg-gray-200 ${
            activeTab === "reset" &&
            "bg-white border-b-2  border-b-white -mb-px z-20"
          }`}
          onClick={handleTabChange}
        >
          Reset password
        </button>
      </div>
      <form
        className="flex flex-col gap-7 border-t pt-4 z-10 "
        onSubmit={handleSubmit}
      >
        {activeTab === "reset" ? (
          <p className="text-center mt-20">
            Here will be the logic for password reset
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {activeTab === "create" ? (
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
              {activeTab === "create" ? "Create account" : "Login"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
