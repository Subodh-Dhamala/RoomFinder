import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import webhookRoutes from './routes/Webhooks.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.send('Server is running!');
});

app.use('/api/webhooks',webhookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})