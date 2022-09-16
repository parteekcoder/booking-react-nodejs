import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import createError from '../../utils/error.js';

export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId;
    const newRoom=new Room(req.body);

    try {
        const savedRoom=await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom=async(req,res,next)=>{
    try {
        //with new true it will provide new updated document 
        const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        console.log(updateRoom)
        res.end()
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailabity=async(req,res,next)=>{
    try {
        //with new true it will provide new updated document 
        const updateRoom=await Room.updateOne({'roomNumber._id':req.params.id},{
            $push:{
                "roomNumber.$.unavailabledates":req.body.dates
            }
        })
        console.log(updateRoom)
        res.json('room has been updated')
    } catch (error) {
        next(error);
    }
}
export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndDelete(hotelId,{$pull:{rooms:req.params.id}});
        } catch (error) {
            next(error);
        }
    } catch (error) {
       return next(error);
    }
}
export const getRoomById=async(req,res,next)=>{
  
    try {
        const room=await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        return next(error);
    }
}

export const getRoom=async(req,res,next)=>{

    try {
        const rooms=await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        
        return next(error);
    }
}