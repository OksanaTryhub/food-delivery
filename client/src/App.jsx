import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import StoreContextProvider from "./context/StoreContext";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <Provider store={store}>
      <AuthLayout>
        <BrowserRouter>
          <StoreContextProvider>
            <Layout>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<PlaceOrder />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                </Route>
              </Routes>
            </Layout>
          </StoreContextProvider>
        </BrowserRouter>
      </AuthLayout>
    </Provider>
  );
}
