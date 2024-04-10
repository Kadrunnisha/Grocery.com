import React from "react";
import "./catgeory.css";
import { Link } from "react-router-dom";

import  tea from "../image/tea.avif";
import  sweet from "../image/sweet.avif";
import  snacks from "../image/snacks.avif";
import  baby from "../image/baby.avif";
import  bakery from "../image/bakery.avif";
import  breakfast from "../image/breakfast.avif";
import  cleaning from "../image/cleaning.avif";
import  cola from "../image/cola.avif";
import  dairy from "../image/dairy.avif";
import  fruit from "../image/fruit.avif";
import  home from "../image/home.avif";
import  masala from "../image/masala.avif";
import  meat from "../image/meat.avif";
import  organic from "../image/organic.avif";
import  personal from "../image/personal.avif";
import  pharma from "../image/pharma.avif";
import  petcare from "../image/petcare.avif";
import   sauces from "../image/sauces.avif";
import   paancorner from "../image/paan-corner_web.avif";
function catgeory(){
    return(
        <>
        <div className="catgeory_box">
            <div className="catgeory_in">
                <Link to="/Product/Drinks"><p><img src={tea}></img></p></Link>
                <Link to="/Product/Sweet_Tooth"><p><img src={sweet}></img></p></Link>
                <Link to="/Product/Snacks_Munchies"><p><img src={snacks}></img></p></Link>
                <Link to="/Product/Biscuits"><p><img src={bakery}></img></p></Link>
                <Link to="/Product/Breakfast"><p><img src={breakfast}></img></p></Link>
                <Link to="/Product/Fruits&Vegitables"><p><img src={ fruit}></img></p></Link>
                <Link to="/"><p><img src={dairy}></img></p></Link>
                <Link to="/Product/Drinks"><p><img src={cola}></img></p></Link>
                <Link to="/Product/Breakfast"><p><img src={sauces}></img></p></Link>
                <Link to="/Product/Masala&Oil"><p><img src={masala}></img></p></Link>
                <Link to="/Product/Fish&meat"><p><img src={meat}></img></p></Link>
                <Link to="/"><p><img src={home}></img></p></Link>
                <Link to="/"><p><img src={organic}></img></p></Link>
                <Link to="/"><p><img src={ personal}></img></p></Link>
                <Link to="/"><p><img src={pharma}></img></p></Link>
                <Link to="/"><p><img src={petcare}></img></p></Link>
                <Link to="/"><p><img src={cleaning}></img></p></Link>
                <Link to="/"><p><img src={paancorner}></img></p></Link>
            </div>
        </div>
        </>
    )
}
export default catgeory;