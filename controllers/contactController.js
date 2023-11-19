 
 import asyncHandler from 'express-async-handler';
 import Contact from '../model/contactModel.js';
 //@desc Get all contacts
 //Route GET /api/contacts 
 //access public
 const getContacts = asyncHandler(async(req,res)=>{
     const contacts = await Contact.find({user_id:req.user.id});
     console.log("contacts -->",contacts);
    res.status(200).json(contacts);
});
//@desc create contact
 //Route POST /api/contacts 
 //access public

 const createContact = asyncHandler(async(req,res)=>{
    console.log("the request body is:",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
 })
    res.status(201).json(contact);
});

//@desc get contact by id
 //Route get /api/contacts/:id 
 //access public

 const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("conatct not found");

    }
    res.status(201).json(contact);
});
//@desc Update contact by id
 //Route PUT /api/contacts/:id 
 //access public

 const updateContact = asyncHandler(async(req,res)=>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("conatct not found");

    }
    if(contact.user_id.toString()!= req.user.id)
    {
        res.status(403).json({message:"User doesnot have permission to update other user"});
    }
    const updatedContact = await Contact.findByIdAndUpdate
    (
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
});

//@desc Delete contact by id
 //Route DELETE /api/contacts/:id 
 //access public

 const deleteContact = asyncHandler(async(req,res)=>{
    const contactRemoved = await Contact.findById(req.params.id);
    if(!contactRemoved){
        res.status(404);
        throw new Error("conatct not found");

    }
    await Contact.remove();
    res.status(200).json(contactRemoved);
});


export  { getContact, createContact, getContacts, updateContact,deleteContact};