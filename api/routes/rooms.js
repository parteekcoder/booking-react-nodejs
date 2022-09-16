import express from "express";
import Room from "./models/Room.js";
import createError from "../utils/error.js";
import {verifyToken,verifyUser,verifyAdmin} from '../utils/verifyToken.js'
import { createRoom, deleteRoom, getRoom, getRoomById, updateRoom,updateRoomAvailabity } from "./controllers/Room.js";
const router=express.Router();

//create 

router.post('/:hotelId',verifyAdmin,createRoom);


//update
router.put('/:id',verifyAdmin,updateRoom);
router.put('/availability/:id',updateRoomAvailabity);
//delete
router.delete('/:id',verifyAdmin,deleteRoom);

//get Room
router.get('/:id',verifyUser,getRoomById);

//get all
router.get('/',verifyAdmin,getRoom);

export default router;