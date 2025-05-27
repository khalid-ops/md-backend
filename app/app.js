import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import msmeApplicationRoutes from './routes/MsmeApplication.js';
import lenderProgramRoutes from './routes/LenderProgram.js';


dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));  
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/api/msme-application', msmeApplicationRoutes);
app.use('/api/lender-program', lenderProgramRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default app;
