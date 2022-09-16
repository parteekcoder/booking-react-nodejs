import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import createError from '../../utils/error.js';
import jwt from 'jsonwebtoken';
export const register=async(req,res,next)=>{
    try {
        // const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password);//if we want salting pass salt as second argument
        const newUser=new User({
           ...req.body ,
            password:hash,
            
        })
        await newUser.save();
        res.status(200).send('user has been created');
    } catch (error) {
        next(error);
    }

}
export const login=async(req,res,next)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        // console.log(user);
        if(!user) return next(createError(404,'user not found'))
    
        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
        
        if(!isPasswordCorrect) return next(createError(400,"user not found"));
        const {password,isAdmin,...otherProp}=user;

        //web token
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},'abc');

        res.cookie("access",token,{
            httpOnly:true
        }).status(200).json({details:{...otherProp},isAdmin});
    } catch (error) {
        next(error);
    }
}