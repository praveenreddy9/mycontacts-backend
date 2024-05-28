const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


//@desc register a user
//@routes POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const { userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash Password
    const hassedPassword = await bcrypt.hash(password, 10);
    console.log("hassedPassword===>",hassedPassword);
    const user = await User.create({
        userName,
        email,
        password: hassedPassword
    });
    console.log(`User created info ${user}`)
    res.json({ message: "Register the user"});
});

//@desc login a user
//@routes POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({ message: "User logged in"});
});

//@desc current user info
//@routes GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({ message: "Fetched current user info"});
});



module.exports = {registerUser,loginUser,currentUser};