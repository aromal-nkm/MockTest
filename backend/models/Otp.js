const mongoose=require('mongoose');
const otpSchema = new mongoose.Schema({
    email:
    {type:String,
     required:true,
       
    },
    otp:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // The document will expire after 5 minutes (300 seconds)
      }
});
module.exports = mongoose.model("OTP", otpSchema);







// const mongoose = require("mongoose");

// const otpSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   otp: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 300 }, // 5-minute expiration
// });

// module.exports = mongoose.model("OTP", otpSchema);
