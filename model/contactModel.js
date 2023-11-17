import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "please add Email"],
    },
    phone: {
        type: String,
        required: [true, "please add the phone number"],
    },
},{
    timestamps:true,
})

const Contact = mongoose.model('contact', contactSchema);

export default Contact;