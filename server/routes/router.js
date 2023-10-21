const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');


/*router.get("/", (req, res)=>{
     console.log("connect");
});*/

// Start Add Userdata Api 
router.post("/register", async (req, res) => {
     //   console.log(req.body, "=====+>body");
     try {
         const { name, email, website_url, images } = req.body;
 
         if (!name || !email || !website_url || !images) {
             return res.status(422).send("Please fill in all the required data");
         }
 
         const preuser = await users.findOne({ email: email });
 
         if (preuser) {
             return res.status(422).send("This email is already registered");
         }
 
         const adduser = new users({
             name,
             email,
             website_url,
             images,
         });
 
         await adduser.save();
 
         return res.status(201).json(adduser);
     } catch (error) {
         return res.status(500).send(error.message);
     }
 });
  
// End Add Userdata Api 


//Start Get UserData Api
router.get("/getdata", async(req, res) =>{
     try{
          const userdata = await users.find();
          res.status(201).json(userdata);
          console.log(userdata);
     } catch (error){
          res.status(422).json(error);

     }
})
//End Get UserData Api

//Start Get One UserData help of ID Api
router.get("/getuser/:id", async(req, res) =>{
     try {
          console.log(req.params);
          const {id} = req.params;

          const usergetdata = await users.findById({_id:id});
          console.log(usergetdata);
          res.status(201).json(usergetdata);

     } catch (error) { 
          res.status(422).json(error);
     }
})
//End Get One UserData help of ID Api

//Start Update UserData Api
router.patch("/updateuser/:id", async(req, res)=>{
     try {
          const {id} = req.params;

          const updateuser = await users.findByIdAndUpdate(id, req.body, {
               new:true
          });

          console.log(updateuser);
          res.status(201).json(updateuser);
          
     } catch (error) {
          res.status(422).json(error); 
     }
})
//End Update UserData Api

//Start Delete UserData Api

router.delete("/deleteuser/:id",async(req,res)=>{
     try {
         const {id} = req.params;
 
         const deletuser = await users.findByIdAndDelete({_id:id})
         console.log(deletuser);
         res.status(201).json(deletuser);
 
     } catch (error) {
         res.status(422).json(error);
     }
 })



// Main Code Here  //
// Generating JWT
router.post("/user/generateToken", (req, res) => {
     // Validate User Here
     // Then generate JWT Token
   
     let jwtSecretKey = process.env.JWT_SECRET_KEY;
     let data = {
         time: Date(),
         userId: 12,
     }
   
     const token = jwt.sign(data, jwtSecretKey);
   
     res.send(token);
 });

 // Verification of JWT
 router.get("/user/validateToken", (req, res) => {
     // Tokens are generally passed in header of request
     // Due to security reasons.
   
     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
     let jwtSecretKey = process.env.JWT_SECRET_KEY;
   
     try {
         const token = req.header(tokenHeaderKey);
   
         const verified = jwt.verify(token, jwtSecretKey);
         if(verified){
             return res.send("Successfully Verified");
         }else{
             // Access Denied
             return res.status(401).send(error);
         }
     } catch (error) {
         // Access Denied
         return res.status(401).send(error);
     }
 });




module.exports = router;