import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = ({ setToken }) => {
  const item = useSelector ((state)=> state.cart);
  const navigate = useNavigate();

  const logOutHandler = () => {
    setToken("");
    localStorage.clear();
    navigate(`/`);
  };

  return (
    <>
      <div className="navbar">
        <p className="logo">Shopping app</p>
         <Link
            to="/productList" className="navLink"
          >Home
            </Link>
         <Link
            to="/cart" className="navLink"
          >Card
            </Link>
            
            <span className="cartCount">Card Item: {item.length}</span>
            <button className="logout-button" onClick={logOutHandler}>
          LogOut
        </button>
      </div>
      <div>
     
      </div>
    </>
  );
};

export default Navbar;
