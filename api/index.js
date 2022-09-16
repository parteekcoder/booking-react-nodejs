import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from './routes/hotel.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';
import roomRoute from './routes/rooms.js';
dotenv.config();
const app=express();


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('connected')
    } catch (error) {
        throw error;
    }
}


//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelRoute);
app.use('/api/users',userRoute);
app.use('/api/rooms',roomRoute)
//error handler middleware
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const  errorMeg=err.message||"Something went wrong";

    return res.status(errorStatus).json({
        status:errorStatus,
        success:false,
        message:errorMeg,
        stack:err.stack
    });
})
app.listen(8800,()=>{
    connectDB();
    console.log('server started at 8800....')
})