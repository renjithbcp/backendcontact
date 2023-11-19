import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are mandatory' });
        return;
    }
    try {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: 'User already registered' });
        // throw new Error("User already registered")
        return;
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Pawword :", hashedPassword);

    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword
        }
    );
    console.log(`User created Successfully: ${user}`);
        res.status(201).json({ _id: user.id, email: user.email, message: 'Registered successfully' });
} catch (error) {
    // Handle any potential errors that might occur during the process
    console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
}
   
});

const loginUser = asyncHandler(async (req, res) => {

    const { email,password} = req.body;
    if(!email||!password){
        res.status(400).json({message:"All fields are mandatory "});
        return;
    }
    const user  = await User.findOne({email});
    if(user && ( await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
          user:{
            username:user.username,
            email:user.email,
            id:user.id
          },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else
    {
        res.status(400).json({message:"email or password is incorrect"});
    }
    res.json({ message: "login successfully!" });
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

export { registerUser, loginUser, currentUser };