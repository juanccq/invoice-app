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
mongoose.connect( process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} )
  .then( () => console.log( 'MongoDB connected' ) )
  .catch( ( err ) => console.error( 'MongoDB connection error:', err) );

// Route imports
import authRoutes from './routes/authRoutes.js';

// Route setup
app.use( '/api/auth', authRoutes );

export default app;