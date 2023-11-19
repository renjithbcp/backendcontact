import express from "express";
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
dotenv.config();

connectDb();
const app = express();
app.use(express.json());

const PORT = process.env.PORT|| 5000;

app.use('/api/contacts', contactRoutes);
app.use('/api/users',userRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running on port number:${PORT}`);
})