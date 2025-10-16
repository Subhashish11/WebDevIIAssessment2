const express=require("express");

//initialising an express module to define routes
const router=express.Router();

//setting up GET route
router.get('/message', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

//setting up POST route
router.post("/data",(req,res)=>{
const receivedData=req.body;
res.json({status:"Success",yourData:receivedData});
});

module.exports=router;
