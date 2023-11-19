import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username :{
        type:String,
        required: [ true,"Please enter a user name"],
    },
    email: {
        type:String,
        required:[true,"please enter a password"],
        unique:[true,"email id is exist"]
    },
    password:{
        type:String,
        required:[true,"please enter a password"],
    }
},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);
export default User;