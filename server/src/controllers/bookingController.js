import Booking from '../models/Booking.js'
import Room from '../models/Room.js';
import mongoose from 'mongoose';


//post - /api/bookings
export const createBooking = async (req,res,next)=>{
  try{

    const {roomId, message} = req.body;
    const tenantId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' })
    }

    const isAvailable = await Room.findOneAndUpdate(
      {_id: roomId, isAvailable:true},
      {isAvailable:false},
      {new:true}
    );

    if(!isAvailable){
      return res.status(400).json({message: 'Room is already booked!'});
    }

    const booking = await Booking.create({
      tenantId:req.user._id,
      landlordId: isAvailable.landlordId,
      roomId,
      message,
    });

    res.status(201).json(booking);

  }
  catch(error){
    next(error);
  }
};

//get /api/bookings/mine
export const getMyBookings = async(req,res,next)=>{
  try{
    const bookings = await Booking.find({tenantId: req.user._id}).populate('roomId');
    res.json(bookings);
  }
  catch(error){
    next(error);
  }
};


//get /api/bookings/incoming
export const getIncomingBookings = async(req,res,next)=>{
  try{
      const bookings = await Booking.find({landlordId:req.user._id}).populate('roomId');

      res.json(bookings);
  }
  catch(error){
    next(error);
  }
};

//patch /api/bookings/:id/status
export const updateBookingStatus = async(req,res,next)=>{
  try{
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid booking ID' })
    }

    const {status} = req.body;

      if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const booking = await Booking.findById(req.params.id);

    if(!booking){
      return res.status(404).json({message: 'Booking not found'});
    }

    if(booking.landlordId.toString() !== req.user._id.toString()){
      return res.status(403).json({message: 'Not your booking'});
    }

    if(status === 'accepted'){
      const room = await Room.findOneAndUpdate(
        {_id: booking.roomId, isAvailable: true},
        {$set: {isAvailable: false}},
        {new: true}
      )

      if(!room){
        return res.status(400).json({message:'Room is already booked'});
      }
    }

    if(status === 'rejected'){
      await Room.findByIdAndUpdate(booking.roomId,{$set:{isAvailable:true}});
    }

    booking.status = status;
    await booking.save();

    res.json(booking);

  }
  catch(error){
    next(error);
  }
};