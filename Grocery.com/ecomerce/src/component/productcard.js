import "./slid.css";
import { useState,useEffect } from "react";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown ,faStopwatch,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
// import { queries } from "@testing-library/react"
import { useRef } from "react"
import React from "react";
import Top from "../image/top.avif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {createContexts} from  "../context/context.js";


const ProductCard=({item})=>{
  const [add,setadd]=useState(0);
  const mail=useContext(createContexts);
    const cartadd=async (id,q)=>{
        console.log(`${id} and ${localStorage.getItem("tokken")}`);
        
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                     email:localStorage.getItem("tokken"),
                     id:id,
                     q:q
            }),
          });
      
          const result = await response.json();
      
          console.log(result); // This will log the result to the console
      
         
        } catch (error) {
          // Handle network errors or other exceptions
          console.error("Error:", error);
        }
      
      
      
      
      
      }
    return(
        <>
        <div  className="element" >
              {/* <a href="#"> */}
                <div className="element_in">
                <div className="img"> <img src={item.image} className="image" /></div>
                  <div className="timer"><FontAwesomeIcon icon={faStopwatch}  className="w"/><p>8 mins</p></div>
                  <div className="title"><p>{item.name.substring(0,50)+"..."}</p></div>
                   <div className="weight"><p>{item.quantity}</p></div>
                  <div className="price_box">
                    <div className="price"><div className="y"><FontAwesomeIcon icon={faIndianRupeeSign}  className="r"/><p>{item.price}</p></div><di className="cut_price"><FontAwesomeIcon icon={faIndianRupeeSign}  className="rc"/><p>{item.cutprice}</p></di></div>
                    <div className="add" >{add==0?<div className="d" onClick={()=>{setadd(add+1); mail.sett(mail.t+1);cartadd(item._id,add)}}>Add</div>:<div className="d" ><p onClick={()=>{setadd(add-1);cartadd(item._id,add)}}>-</p><p>{add}</p><p onClick={()=>{setadd(add+1);cartadd(item._id,add)}}>+</p></div>}</div>
                  </div>
                 
                </div>
              {/* </a> */}
            </div>

        
        
        </>
    )
}
export default ProductCard;