import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';

//routes
import webhookRoutes from './routes/Webhooks.js';
import uploadRoutes from './routes/upload.js';
import listingRoutes from './routes/listing.js';
import wishlistRoutes from './routes/wishlist.js';
import bookingRoutes from './routes/booking.js';
import profileRoutes from './routes/profile.js'


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.use('/api/webhooks', webhookRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/profile', profileRoutes);

//error handler — always last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});