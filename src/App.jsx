import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import StoreContextProvider from "./context/StoreContext";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <StoreContextProvider>
        <Layout>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
          </Routes>
        </Layout>
      </StoreContextProvider>
    </BrowserRouter>
  );
}
