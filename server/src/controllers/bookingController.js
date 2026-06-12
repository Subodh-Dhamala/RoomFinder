import * as bookingService from '../services/booking.service.js';

//post - /api/bookings
export const createBooking = async (req,res,next)=>{
  try{

    const booking = await bookingService.createBooking(req.body.roomId, req.body.message,req.user._id);
    res.status(201).json(booking);
  }
  catch(error){
    next(error);
  }
};

//get /api/bookings/mine
export const getMyBookings = async(req,res,next)=>{
  try{
    const bookings = await bookingService.getMyBookings(req.user._id);
    res.json(bookings);
  }
  catch(error){
    next(error);
  }
};


//get /api/bookings/incoming (bookings where user is landlord)
export const getIncomingBookings = async(req,res,next)=>{
  try{
    const bookings = await bookingService.getIncomingBookings(req.user._id);
    res.json(bookings);
  }
  catch(error){
    next(error);
  }
};

//patch /api/bookings/:id/status
export const updateBookingStatus = async(req,res,next)=>{
  try{

   const booking = await bookingService.updateBookingStatus(
      req.params.id,
      req.params.status,
      req.user_.id
    )
  
    res.json(booking);

  }
  catch(error){
    next(error);
  }
};