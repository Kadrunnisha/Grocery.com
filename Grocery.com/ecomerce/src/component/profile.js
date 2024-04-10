import React, { useState ,useEffect} from "react";
import "./profile.css";
import {useContext} from "react";
import {createContexts} from  "../context/context.js";
 const Profile=()=>{
    const add=useContext(createContexts);
    const [data,setdata]=useState([]);
    useEffect( ()=>{
      
        const fetchdata=async ()=>{
  
  
      try {
          const response = await fetch("/api/profile", {
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
         setdata(result)
         
        } catch (error) {
          // Handle network errors or other exceptions
          console.error("Error:", error);
        }
     }
      fetchdata();
    
   },[])
    return (
        <div className="profile-container">
          <div className="profile">

         
            <div className="h"><p>Profile</p></div>
            <div className="c1">
                <div className="c2">
                <div><p>Name:</p></div>
                <div><p>Phone No:</p></div>
                <div><p>Email:</p></div>
                <div><p>Address:</p></div>
                 
                </div>
                <div className="c3">
                 <div><p>{data.name}</p></div>
                 <div><p>{data.phone_no}</p></div>
                 <div><p>{data.email}</p></div>
                 <div><p>{add.add}</p></div>
                </div>
                
            </div>
         </div>
        </div>
    )
 }
 export default Profile;