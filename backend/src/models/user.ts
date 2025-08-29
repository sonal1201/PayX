import mongoose from "mongoose"


 const userSchema =  new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    gmail:{ 
        type: String,
    },
    password:{
      type: String,
    required: true
    }
})

export const userModel = mongoose.model('userModel',userSchema);