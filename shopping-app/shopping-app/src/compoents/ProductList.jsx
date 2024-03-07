import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";


const ProductList = ({ token, setProductData }) => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate(`/`);
    }
    setLoading(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    })
      .then((response) => {
        setData(response.data);
        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);



  return (
    <>
      <div className="product-container">
        {loading && (
          <div>
            {""}
            <h1>Loading...</h1>
          </div>
        )}

        {data.map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => navigate(`/ProductList/${product.id}`)}
          >
            <div>
              <img src={product.image} alt="#"></img>
            </div>
            <div className="card-decription">
              <h6>{product.title}</h6>
              <h6>{`Price: ${product.price}`}</h6>
              <h6>{`Category: ${product.category}`}</h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
