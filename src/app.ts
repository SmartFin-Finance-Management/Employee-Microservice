import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/EmployeeRoutes';
import connectDB from './config/database';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', employeeRoutes);

export default app;
