import { useEffect, useState } from "react";
import React from "react";
import ProductCard from "./productcard";
import "./cart.css";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown ,faStopwatch,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import {createContexts} from  "../context/context.js";
 import { useNavigate } from "react-router-dom";
const Cart=()=>{
  const mail=useContext(createContexts);
  console.log(mail);
  const history=useNavigate();
    const[cart,setcart]=useState([]);
    const[total,settotal]=useState(0);
    const[iteam,setiteam]=useState(0);
    const[ij,seti]=useState(0);
    const[orders,setorders]=useState()
    const remove=async(id)=>{
      try {
        const response = await fetch("/api/removeiteam", {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                   email:localStorage.getItem("tokken"),
                   id:id
                  
          }),
        });
    
        const result = await response.json();
    
        console.log(result+"bbbbbbb"); // This will log the result to the console
    
       
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error:", error);
      }
    }
    const placeOrder = async () => {
      try {
          // Fetch user's cart items from /api/cart
          const cartResponse = await fetch("/api/cartorder",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                email: localStorage.getItem("tokken"),
            }),
          });
          const cartResult = await cartResponse.json();
          const orders = cartResult; // Extract cart items
  
          // Send a POST request to place the order
          const orderResponse = await fetch("/api/orders", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  orders: [orders],
                  email: localStorage.getItem("tokken")
              }),
          });
          const deletecart=await fetch("/api/deletecart",{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem("tokken"),
            }),
          })
  
          // Parse the response from placing the order
          const orderResult = await orderResponse.json();
          console.log(orderResult); // Log the result of placing the order
  
          // Optionally, update UI or perform other actions based on the order result
      } catch (error) {
          // Handle network errors or other exceptions
          console.error("Error:", error);
      }
       

  };
  
    const Cart_in=async (id,q)=>{
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
    useEffect( ()=>{
      
      const fetchdata=async ()=>{


    try {
        const response = await fetch("/api/cartfind", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                   email:localStorage.getItem("tokken"),
                 
          }),
        });
    
        const result = await response.json();
    
        console.log(result); // This will log the result to the console
       setcart(result);
       setiteam(result.length)
       mail.sett(result.length);
       let s=0;
      for(let i=0;i<result.length;i++){
        console.log("assss");
             s=s+(result[i].price*result[i].qun);
      }
      console.log("price"+result.length);
      settotal(s);
       
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error:", error);
      }
   }
        
   




   if (mail.mail===null) {
    
    history("/login") // Redirect user to login page if not logged in
  } else {
    fetchdata();
  }
   
  
  
 },[mail.mail,history,ij])
 
 console.log(cart);
    return(
    <>
    
       
       <div className="product_container-cart">
           
            <div className="product_main_container-cart">
               <div className="heading-cart">
                <p>Cart</p>
                
               
                
               </div>
               
               <div className="product_box-cart" >
              <div className="cart_prodrucet"> 
               {cart.map((item, index) => (
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
                               <div className="add" ><div className="d"><div className="qun"><p className="in" onClick={()=>{seti(ij+1);Cart_in(item._id,item.qun-1)}}>-</p><p>{item.qun+1}</p><p  className="in" onClick={()=>{seti(ij+1);Cart_in(item._id,item.qun+1)}}>+</p></div></div></div>
                               
                             </div>
                             <div className="remove"><div onClick={()=>{ seti(ij+1);remove(item._id);}}>Remove</div></div>
                           </div>
                         {/* </a> */}
                       </div>
           
                   
                   
                   </>
           
           ))} 
           </div>
            <div className="total_price_conatiner">
                     <div className="price_heading">Price Details</div>
                     <div className="price-details">
                      <div><p>Price ({iteam} items)</p><p><FontAwesomeIcon icon={faIndianRupeeSign}  className="r"/>{total}</p></div>
                      <div><p>Discount</p><p>0</p></div>
                      <div><p>Delivery Charges</p><p>Free</p></div>
                     </div>
                     <div className="total_price">
                      <div><p>TOTAL</p><p><FontAwesomeIcon icon={faIndianRupeeSign}  className="r"/>{total}</p></div>
                     </div>
                     <div className="place_order">
                      <div onClick={()=>{seti(ij+1); placeOrder()}}>PLACE ORDER</div>
                     </div>
               </div>
               </div>
            </div>
       </div>
    </>

    )
};
export default Cart;