import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile.jsx";
import Layout from "./components/Layout";
import Header from "./components/Header";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <AuthLayout>
        <BrowserRouter>
          {/* <StoreContextProvider> */}
          <ToastContainer />
          <Header />
          <Layout>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/admin" element={<Home />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/admin/add" element={<AddItem />} />
                <Route path="/admin/list" element={<ItemList />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          {/* </StoreContextProvider> */}
        </BrowserRouter>
      </AuthLayout>
    </Provider>
  );
}
