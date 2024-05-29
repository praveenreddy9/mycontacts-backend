const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    console.log(`User created info ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email:user.email, })
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user"});
});

//@desc login a user
//@routes POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} =req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    const user = await User.findOne({ email});
    //comapring password with hassed password
    if(user && (bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                userName : user.userName,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc current user info
//@routes GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({ message: "Fetched current user info",data: req.user});
});



module.exports = {registerUser,loginUser,currentUser};