const express= require("express");
const router= express.Router();
const URL = require("../models/url");

router.get("/",async(req,res)=>{
    let allUrls= await URL.find()
    console.log(allUrls);
    res.render("home",{allUrls});
})

module.exports = router;