import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import React from 'react'
import { CartProvider} from "./context/context.js";
ReactDOM.render(
  // <h1>hi</h1>,
   <CartProvider>
    <App></App>
   </CartProvider>,
    
  
  
  document.getElementById('root')
)