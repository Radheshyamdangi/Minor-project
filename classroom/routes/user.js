const express = require("express")
const router = express.Router();
//Index - users
router.get("/",(req,res) =>{
    res.send("get request on user");
});
 //show - users
 router.get("/:id",(req,res) =>{
    res.send("get request on  show user id");
});
//Post user
router.post("/",(req,res) =>{
    res.send("get request on post user");
})
//Delete user
router.delete("/:id",(req,res) =>{
    res.send("get request on delete user id")
})


module.exports = router;