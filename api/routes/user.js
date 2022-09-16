import express from "express";
import {verifyToken,verifyUser,verifyAdmin} from '../utils/verifyToken.js';
import {  deleteUser, getUser, getUserById, updateUser } from "./controllers/User.js";
const router=express.Router();

//check authentication
// router.get('/checkAuthentication',verifyToken,(req,res,next)=>{
//         res.end('you are authenticted');
    
// });

// router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//         res.end('now you can delete this account');
    
// });
// router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//         res.end('hi admin now you can delete this account');
    
// });

//update
router.put('/:id',verifyUser,updateUser);

//delete
router.delete('/:id',verifyUser,deleteUser);

//get User
router.get('/:id',verifyUser,getUserById);

//get all
router.get('/',verifyAdmin,getUser);

export default router;