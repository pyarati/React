import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Product from "./Product";
import Footer from "./Footer";
import Cart from "../pages/Cart";
import Login from "./Login";
import { useState } from "react";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";

const RouteList = () =>{
    const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
    const [productData, setProductData] = useState([]);
    return (
        <>
        <Provider store={store}>
<BrowserRouter>
{token ? <Navbar setToken={setToken}  /> : <h1 style={{display:"flex", alignItems:'center', justifyContent:'center'}}>Shopping App</h1>}

<Routes>
  <Route
    path="/"
    element={<Login token={token} setToken={setToken} />}
  ></Route>
  <Route
    path="/productList"
    element={
      token ? <ProductList token={token} setProductData={setProductData}/> : <Login token={token} setToken={setToken} />}
    
  ></Route>

<Route
    path="/cart"
    element={
      <Cart/>
    }
  ></Route>

  <Route
    path="/productList/:productId"
    element={<Product token={token} productData={productData} />}
  ></Route>
</Routes>
{token && <Footer />}
</BrowserRouter>
</Provider>
</>)
}

export default RouteList;