const mongoose=require("mongoose")
const url='mongodb+srv://kadrunnisha2:nTgxCdip3Ec5rRSM@intenship.oqexe5i.mongodb.net/ecomercedb?retryWrites=true&w=majority&appName=intenship'
mongoose.connect(url)
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("faild connection");
})

const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true,
        
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    cart:[{
        id:{
            type:String
        },
        q:{
            type:Number
        }
       
    }],
    orders:[
        {
            id:{
                type:String
            },
            q:{
                type:Number
            }
        }
    ]
},{collection:'userdata'})
const slideSchema=new mongoose.Schema({
    id:{type:Number,required:true},
    catgeory:{type:String,required:true},
     image:{type:String,required:true},
     name:{type:String,required:true},
     quantiy:{type:String,required:true},
     price:{type:Number,required:true},
     cutprice:{type:Number,required:true}
     
},{collection:'user'})
const slideSchema2=new mongoose.Schema({
    id:{type:Number,required:true},
    catgeory:{type:String,required:true},
    subcatgeory:{type:String,required:true},
     image:{type:String,required:true},
     name:{type:String,required:true},
     quantiy:{type:String,required:true},
     price:{type:Number,required:true},
     cutprice:{type:Number,required:true},
     qun:{type:Number}
     
},{collection:'user'})
const Slidemodel=mongoose.model("Slidemodel",slideSchema);
const Slidemodel2=mongoose.model("Slidemodel2",slideSchema2);
 const Usermodle=mongoose.model("Usermodle",newSchema);
 module.exports={Usermodle,Slidemodel,Slidemodel2};
