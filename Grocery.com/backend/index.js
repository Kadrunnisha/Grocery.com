const express = require("express");
const {Usermodle,Slidemodel,Slidemodel2} = require("./mongodb.js");
const cors = require("cors");
const app = express();
const path=require("path");
const PORT=process.env.PORT || 8000;
app.use("/image2",express.static(path.join(__dirname,"/image2")));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get("/api/slid1", cors(),async (req, res) => {
  try {
    const slid_data = await Slidemodel2.find({});
   
    console.log(slid_data);
    // const html=`<ul>
    // ${allDbUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}
    // </ul>C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1\slid2
    // `C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1
    return res.json(slid_data);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", cors(), async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    const check = await Usermodle.findOne({ email: email });

    if (check) {
      console.log(email);
      res.json("exists");
    } else {
      res.json("notexists");
    }
  } catch (e) {
    console.error(e);
    res.json("not exit");
  }
});

app.post("/api/signin", async (req, res) => {
  const { name, phone_no, email, password } = req.body;
  const data = {
    name: name,
    phone_no: phone_no,
    email: email,
    password: password,
    cart:[]
  };

  console.log(data);

  try {
    const check = await Usermodle.findOne({ email: email });
 
    if (check) {
      console.log(email);
      res.json("exists");
    } else {
        await Usermodle.insertMany(data);
      res.json("notexists");
    }
  } catch (e) {
    console.error(e);
    res.json("not exit");
  }
});
// app.post("/api/cart",async (req,res)=>{
  

//   try {
//     console.log(req);
//     const check = await Usermodle.updateOne({email:(req.body.email)},{$addToSet:{cart:{id:req.body.id,q:req.body.q}}});

//     if (check) {
      
//       res.json("added to cart");
//     } else {
//       res.json("not added to cart");
//     }
//   } catch (e) {
//     console.error(e);
//     res.json("not added to cart");
//   }
// });
// app.post("/api/cartfind",async (req,res)=>{

//   try {
//     const check = await Usermodle.findOne({email:(req.body.email)},{cart:1});
//     console.log(check);
//     if (check) {
//       const slid_data = await Slidemodel2.find({_id:{$in:check.cart.id}});
   
//       console.log(slid_data);
//       // const html=`<ul>
//       // ${allDbUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}
//       // </ul>C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1\slid2
//       // `C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1
//       return res.json(slid_data);
      
      
//     } else {
//       res.json("not added to cart");
//     }
//   } catch (e) {
//     console.error(e);
//     res.json("not added to cart   mmm");
//   }


// });

// app.post("/api/cart", async (req, res) => {
//   try {
//     const { email, id, q } = req.body;

//     const updatedUser = await Usermodle.findOneAndUpdate(
//       { email }, // Find the document with the specified email
//   { 
//     $set: { "cart.$[elem].q": q }, // Update the q field of the matched cart entry
//     $addToSet: { cart: { id, q } } // Add a new entry if id doesn't exist
//   },
//   { 
//     new: true, // Return the modified document
//     arrayFilters: [{ "elem.id": id }] // Filter to update only the cart entry with the specified id
//   }
//     );

//     if (updatedUser) {
//       return res.json("Added to cart");
//     } else {
//       return res.json("User not found");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.json("Failed to add to cart");
//   }
// });
app.post("/api/cart", async (req, res) => {
  try {
    const { email, id, q } = req.body; // Extracting email, id, and q from the request body
      console.log(q);
    const user = await Usermodle.findOne({ email });

    if (user) {
      let updated = false;
    
      // Check if the cart item with the specified id exists
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].id === id) {
          user.cart[i].q = q; // Update q value
          updated = true;
          break;
        }
      }
    
      // If cart item with id doesn't exist, add it
      if (!updated) {
        user.cart.push({ id, q });
      }
    
      const updatedUser = await user.save();
    console.log(updatedUser);
      return res.json(updatedUser);
    } else {
      return res.json("User not found");
    }
    

   
  } catch (error) {
    console.error(error);
    return res.json("Failed to add to cart"+error);
  }
});


app.post("/api/cartfind", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Usermodle.findOne({ email }, { cart: 1 });

    if (user) {
      const cartIds = user.cart.map(item => item.id);
      const qu=user.cart.map(item => item.q);
      console.log(qu);
      
      const slid_data = await Slidemodel2.find({ _id: { $in: cartIds } });
      slid_data.forEach((item, index) => {
        for(let i=0;i<user.cart.length;i++){
          if(user.cart[i].id===item._id.toString()){
            item.qun = user.cart[i].q;
          }
        }
        // Add the corresponding quantity from the user's cart
      });
      console.log(slid_data);
      return res.json(slid_data);
    } else {
      return res.json("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.json("Failed to find items in cart");
  }
});
app.post("/api/cartorder", async (req, res) =>{
 
      const { email }=req.body;
      console.log(email+"");
      const user = await Usermodle.findOne({ email }, { cart: 1 });
      console.log(user+"mm");
      return res.json(user);
 
});
app.post("/api/orders", async (req, res) => {
  try {
      const { orders, email } = req.body; // Extract orders and email from the request body
      console.log(orders + "nnnnn");

      // Update the user document to add orders
      const result = await Usermodle.updateOne(
          { email: email }, // Filter for the specific user document
          { $push: { orders: { $each: orders } } } // Use $push with $each to add multiple items
      );

      if (result.nModified === 1) {
          console.log("Orders added successfully");
          return res.status(200).json("Orders added successfully");
      } else {
          console.log("Failed to add orders");
          return res.status(500).json("Failed to add orders");
      }
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json("Internal Server Error");
  }
});



app.post("/api/profile",async (req,res)=>{
  try{
    const check= await Usermodle.findOne({email:(req.body.email)},{cart:0});
    if(check){
      return res.json(check);
    }
    else {
      res.json("not added to cart");
    }
  }
  catch (e) {
    console.error(e);
    res.json("user not found");
  }
});
app.delete("/api/logout",async(req,res)=>{
  
    const email=await Usermodle.deleteOne({email:(req.body.email)});
    res.send(email);
});
app.delete("/api/deletecart",async(req,res)=>{
  const email = req.body; // The email to search for

try {
    const result = await Usermodle.updateOne(
        { email: email }, // Filter for the specific user document
        { $set: { cart: [] } } // Use $set to set the cart field to an empty array
    );

    if (result.nModified === 1) {
        console.log("Cart deleted successfully");
    } else {
        console.log("Cart not found for the specified email");
    }
} catch (error) {
    console.error("Error:", error);
}
});
app.delete("/api/removeiteam", async (req, res) => {
  const { email, id } = req.body;

  try {
      const user = await Usermodle.findOne({ email });

      if (!user) {
          return res.status(404).send("User not found");
      }

      let itemRemoved = false;
      for (let i = 0; i < user.cart.length; i++) {
          if (user.cart[i].id === id.toString()) {
              user.cart.splice(i, 1);
              itemRemoved = true;
              break;
          }
      }

      if (itemRemoved) {
          await user.save();
          return res.status(200).send("Item removed successfully");
      } else {
          return res.status(404).send("Item not found in user's cart");
      }
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).send("Internal Server Error");
  }
});
app.use(express.static(path.join(__dirname,"../ecomerce/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../ecomerce/build/index.html"));
})

app.listen(PORT, () => {
  console.log("connected");
});
