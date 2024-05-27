import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <StoreContextProvider> */}
        <ToastContainer />
        <Header />
        <Layout>
          <Routes>
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/add" element={<AddItem />} />
            <Route path="/admin/list" element={<ItemList />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Routes>
        </Layout>
        {/* </StoreContextProvider> */}
      </BrowserRouter>
    </Provider>
  );
}
