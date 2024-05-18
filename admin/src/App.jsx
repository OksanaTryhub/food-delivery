import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";
import Orders from "./pages/Orders";
import Layout from "./components/Layout";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* <StoreContextProvider> */}
      <ToastContainer />
      <Header />
      <Layout>
        <Routes>
          <Route path='/add' element={<AddItem />} />
          <Route path='/list' element={<ItemList />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </Layout>
      {/* </StoreContextProvider> */}
    </BrowserRouter>
  );
}
