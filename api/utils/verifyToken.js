import jwt from 'jsonwebtoken';
import createError from './error.js';
import cookie from 'cookie-parser'
export const verifyToken=(req,res,next)=>{
    console.log(req.cookie)
    const token=req.cookies.access;
    if(!token) return next(createError(401,"You are not authorized"));

    jwt.verify(token,'abc'/*secret string*/,(error,user)=>{
        if(error) return next(createError(401,"you are not authenticated"));

        req.user=user;
        next();
    } )
}
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{

        if(req.user.id===req.params.id){
            next();
        }else{
            return next(createError(401,'you are not authorized'));
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{

        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(401,'you are not authorized'));
        }
    })
}
