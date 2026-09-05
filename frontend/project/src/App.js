import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/index.css'
import ScrollToTop from "./Components/ScrollToTop";

import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import BestSellers from './Components/BestSellers'
import ExploreMenu from './Components/ExploreMenu'
import ProcessSec from './Components/ProcessSec'
import MsgSec from './Components/MsgSec'
import Footer from './Components/Footer'
import ProductDetails from "./Pages/ProductDetails";

import CartContextProvider from "./Context/CartContext";
import AuthContextProvider from "./Context/AuthContext";

import Cakes from "./Pages/Cakes";
import Cookies from "./Pages/Cookies";
import Drinks from "./Pages/Drinks";
import Cart from "./Pages/Cart"; // Your newly updated Cart
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import WishList from "./Pages/WishList";
import MyOrders from "./Pages/MyOrders";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
    <AuthContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        
        <Cart /> 

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <BestSellers />
                <ExploreMenu />
                <ProcessSec />
                <MsgSec />
              </>
            }
          />

          {/* Cakes Page */}
          <Route path="/cakes" element={<Cakes />} />

          {/* Cookies Page */}
          <Route path="/cookies" element={<Cookies />} />

          {/* Drinks Page */}
          <Route path="/drinks" element={<Drinks />} />

          {/* Product Details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/success" element={<OrderSuccess />} />

          <Route path="/wishlist" element={<WishList />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App;