import "./nav.css";
import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faCartShopping, faChevronDown,faLocationDot,faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import Login from "./login";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {createContexts} from  "../context/context.js";
const api_endpoint="https://api.opencagedata.com/geocode/v1/json";
const api_key="d177b7204f944c5981a71062d70a6971";

 
const Nav=()=>{
  // const l=useLocation();
  const [location_click,setlocation_click]=useState(false);
  const [location, setlocation] = useState("Enter Location");
  const [location2, setlocation2] = useState("");
   const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [on,seton]=useState(false);
  const[acc,setacc]=useState(null);
  // console.log(l.state.id);
  const history=useNavigate();
  const mail=useContext(createContexts);
  console.log(mail.mail+"nnnnn");
  function login(){
        
      // <Login></Login>
  }
  function onclick_funset(){
    setlocation_click(!location_click);
  }
  useEffect(()=>{
   navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);});
      const acc=localStorage.getItem("tokken");
      if(acc)
      {
        mail.setmail(acc)
        setacc(acc);
      }
      else
      {
        setacc(null);
      }
      console.log(acc)

  },[]);
  const logout = () => {
    
    fetch("/api/logout", {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            localStorage.clear();
            // Redirect the user after logout
            history("/");
            window.location.reload(false); 
            alert("You have logged out");
            
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
        // Handle error if necessary
    });
}

  const fetchLocationData = () => {
    const locationQueryString = `${latitude},${longitude}`;
    const apiRequestUrl = `${api_endpoint}?key=${api_key}&q=${locationQueryString}&pretty=1`;
   
    fetch(apiRequestUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("jii");
        // const [city,state,postcode,country]=data.results[0].components;
        // const fulladdress=`${city},${state},${postcode},${country}`;
        setlocation(data.results[0].formatted.substring(0,10)+"...");
        setlocation2(data.results[0].formatted);
        console.log(data.results[0].formatted);
        setlocation_click(false);
        // Handle the fetched data as needed
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  };

  let fun=() => {
   if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          console.log(result.state);
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            setLatitude(position.coords.latitude);

            setLongitude(position.coords.longitude);

            console.log("Updated Latitude:", position.coords.latitude);
            console.log("Updated Longitude:", position.coords.longitude);

            // Fetch location data when geolocation is granted
           
            navigator.geolocation.getCurrentPosition( fetchLocationData);
          });
        } else if (result.state === "prompt") {
          console.log("User prompted for location permission");
          
          
        } else if (result.state === "denied") {
          console.log("User denied location permission");
          alert("proved location permision");
          // Handle the case where the user denied location permission
        }
      });
   }
      
       // Include latitude and longitude in the dependency array if needed

    // Rest of your component code...
  };
  mail.setadd(location2);
    return(<>
          <div className="replace_navbar"></div>
          <div className="navbar_box">
           
          <div className="logo" ><Link to="/"><lable>Grocery.com</lable></Link></div>
            <div className="location"><a  onClick={ onclick_funset}><p >{location}</p>   <FontAwesomeIcon icon={ faChevronDown} className="i" /></a>
            {location_click==true?
            <><div className="triangle"></div>
            <div className="loc_box">
               <div className="b1"> <FontAwesomeIcon icon={faLocationDot}  className="b3i"/><div className="b4">To deliver as quickly as possible, we would like your current location</div></div>
                <div className=" b2">
                  <a href="#" className="but1">Type Mannually</a>
                  <a href="#" className="but2" onClick={fun}>Current Location</a>
                </div>
            </div></>:<></>}
            </div>
           
            <div className="searchbar_box">
                <div className="box">
                <li className="icon">
                    
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </li>
                   <li className="input_box" >
                      
                      <input type="text"  className="input"  placeholder="Search for Products,Brands and More"></input>
                   </li>
                </div>
                    
                
             </div>
             <div className="login">
              {(mail.mail==null)?<Link to="/login"> <a  href="#"  onClick={login}>Login</a></Link>: <div className="account">
                <div className="ac"  onClick={()=>{seton(!on)}}><p>Account</p> <FontAwesomeIcon icon={faCaretDown} className="a-i" /></div>
                {on==true?
                   <div className="account-list">
                   <Link to="/profile" onClick={()=>{seton(!on)}}> <p>My Profile</p></Link> 
                  <Link to="/orders" onClick={()=>{seton(!on)}}> <p>My Orders</p></Link>
                  <Link to="/address" onClick={()=>{seton(!on)}}> <p>Saved Address</p></Link>
                   
                  <p onClick={logout}> Log Out</p>
                 </div>:<></>
                }
               
                </div>} 
               
             </div>
             <div className="cart_container">
             <div className="circle">{mail.t}</div>
             <div className="cart">
                <Link to="/cart">
                    <FontAwesomeIcon icon={faCartShopping}  className="i"/>
                    
                    <p>Cart</p>
                  </Link>
             </div>
             </div>
             

          </div>
    </>)
}
export default Nav;
