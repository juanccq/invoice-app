import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
mongoose.connect( process.env.MONGO_URL, {} )
  .then( () => console.log( 'MongoDB connected' ) )
  .catch( ( err ) => console.error( 'MongoDB connection error:', err) );

// Route imports
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

// Route setup
app.use( '/api/auth', authRoutes );
app.use( '/api/category', categoryRoutes );
app.use( '/api/product', productRoutes );
app.use( '/api/user', userRoutes );
app.use( '/api/invoice', invoiceRoutes );
app.use( '/api/report', reportRoutes );

export default app;
