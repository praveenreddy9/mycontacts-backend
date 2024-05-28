const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required:[true,"Please enter user name"]
    },
    email:{
        type: String,
        required:[true,"Please enter user email address"],
        unique:[true, "Email address taken"]
    },
    password:{
        type: String,
        required:[true,"Please enter password"]
    },
},{
    timestamps: true
});


module.exports = mongoose.model("User",userSchema);