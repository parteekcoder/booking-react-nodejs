import User from "../models/User.js";

export const updateUser=async(req,res,next)=>{
    try {
        //with new true it will provide new updated document 
        const updateUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        console.log(updateUser)
        res.end()
    } catch (error) {
        next(error);
    }
}
export const deleteUser=async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        console.log('User deleted');
        res.end()
    } catch (error) {
       return next(error);
    }
}
export const getUserById=async(req,res,next)=>{
  
    try {
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
}

export const getUser=async(req,res,next)=>{

    try {
        const users=await User.find();
        res.status(200).json(users);
    } catch (error) {
        
        return next(error);
    }
}