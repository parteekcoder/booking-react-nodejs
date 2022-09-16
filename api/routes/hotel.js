import express from "express";
import Hotel from "./models/Hotel.js";
import createError from "../utils/error.js";
import {verifyAdmin} from '../utils/verifyToken.js'
import { countByCity,countByType, createHotel, deleteHotel, getHotel, getHotelById, getHotelRooms, updateHotel } from "./controllers/hotel.js";
const router=express.Router();

//create 

router.post('/',verifyAdmin,createHotel);


//update
router.put('/:id',updateHotel);

//delete
router.delete('/:id',deleteHotel);

//get hotel
router.get('/find/:id',getHotelById);

//get all
router.get('/',getHotel);
router.get('/countByCity',countByCity);
router.get('/countByType',countByType);

router.get('/room/:id',getHotelRooms);



export default router;