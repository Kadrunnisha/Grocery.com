import React, { useState ,useEffect} from "react";
import "./address.css";
import {useContext} from "react";
import {createContexts} from  "../context/context.js";
 const Address=()=>{
    const add=useContext(createContexts);
    
    return (
        <div className="address-container">
            <div className="address">
             <div className="address-heading"><p>Address</p></div>
             <div className="c1-a">
                <div className="c2-a">
                 <p>Saved Address:</p>
                </div>
                <div className="c3-a">
                <p>{add.add}</p>
                </div>
             </div>
            </div>
        </div>
    )
 }
 export default Address;