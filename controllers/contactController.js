const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@routes GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res)=>{
    // res.send("Get all contacts");
    res.status(200).json({message:"Get all contacts list",data:"PRAVEEN"}); 
});


//@desc Create contact
//@routes POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res)=>{
    console.log('Create contact details===>',req.body);
    const { name, email, mobile} = req.body;
    if(!name || !email || !mobile){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).json({message:"Contact created !!",data:"PRAVEEN"}); 
});

//@desc get contact based on id
//@routes GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Fetch contact for ${req.params.id}`,data:"PRAVEEN"}); 
});

//@desc update contact based on id
//@routes PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`,data:"PRAVEEN"}); 
});

//@desc delete contact based on id
//@routes DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Delete contact for ${req.params.id}`,data:"PRAVEEN"}); 
});



module.exports = { getContacts,createContact,getContact,updateContact,deleteContact};