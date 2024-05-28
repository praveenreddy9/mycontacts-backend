const asyncHandler = require("express-async-handler");
const { Schema, default: mongoose } = require("mongoose");

const Contact = require("../models/contactModel");
//@desc Get all contacts
//@routes GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res)=>{
    // res.send("Get all contacts");
    const contacts = await Contact.find();
    res.status(200).json({message:"Get all contacts list",data:contacts}); 
});


//@desc Create contact
//@routes POST /api/contacts
//@access public
const createContact = asyncHandler(async (req,res)=>{
    console.log('Create contact details===>',req.body);
    const { name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });
    // var tempData = new Schema({'name':String,'email':String,'mobile':String},{strict:true});
    // var modelCreate = mongoose.model('testUsersList',tempData);
    // var newModel = new modelCreate(req.body);
    // newModel.save();
    res.status(201).json({message:"Contact created !!",data:contact}); 
});

//@desc get contact based on id
//@routes GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact details Not found");
    };
    res.status(200).json({message:`Fetched contact details for ${req.params.id}`,data:contact}); 
});


//@desc update contact based on id
//@routes PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact details Not found");
    };

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json({message:`Update contact for ${req.params.id}`,data:updatedContact}); 
});
  
//@desc delete contact based on id
//@routes DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact details Not found");
    };
    await Contact.remove();

    res.status(200).json({message:`Delete contact for ${req.params.id}`,data:contact}); 
});



module.exports = { getContacts,createContact,getContact,updateContact,deleteContact};