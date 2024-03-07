import {useParams} from "react-router-dom";
import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {add} from "../store/cartSlice"
import {useDispatch} from "react-redux"
// import axios from "axios";

const Product = ({token, productData}) =>{
    const navigate = useNavigate();
    const {productId} = useParams();
    const dispatch = useDispatch();
    // const [product, setProduct] = useState();

    useEffect(() => {
        if (!token) {
          navigate(`/`);
        }

        // axios({
        //   method:"GET",
        //   url:`https://fakestoreapi.com/products/${productId}`
        // })
        // .then((response) =>{
        //   setProduct(response.data);
        // }).catch((error) =>{
        //   console.log(error)
        // }).finally(()=>{console.log("Succesfully fetch data")})
    },[])

    const product = productData.find(product => product.id === Number(productId));

    const handleAdd = (product) =>{
      dispatch(add(product))
    }

    if (!product) {
        return <div>Product not found</div>;
      }

      return (
        <div className="product-details">
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{`Price: ${product.price}`}</p>
          <p>{`Category: ${product.category}`}</p>
          <p>{`Description: ${product.description}`}</p>
          <button className="btn" onClick={() => handleAdd(product)}>Add to card</button>
        </div>
      )

};

export default Product;