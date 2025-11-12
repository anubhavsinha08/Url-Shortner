const mongoose= require("mongoose");

const urlSchemma= new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURl:{
        type: String,
        required: true
    },
    visitHistory: [{timeStamp: {type: Number}}]
},{timestamps:true})


const URL = mongoose.model("Url", urlSchemma);

module.exports=URL;