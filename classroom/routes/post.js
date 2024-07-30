const express = require("express")
const router = express.Router();


//post 
//Index -
router.get("/",(req,res) =>{
    res.send("get request on posts");
});
 //show - 
router.get("/:id",(req,res) =>{
    res.send("get request on  show posts id");
});
//Post 
router.post("/",(req,res) =>{
    res.send("get request on posts");
})
//Delete 
router.delete("/:id",(req,res) =>{
    res.send("get request on delete posts id")
})
module.exports = router;