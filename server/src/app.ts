import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './controllers/errorHandlingController.js';
import cookieParser from 'cookie-parser';
import { menuRouter } from './routes/menuRoutes.js';
import { promotionalRouter } from './routes/Promotional_offers_Routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { SetHeader } from './controllers/authController.js';

const ORIGIN_URL = process.env.CLIENT_BASE_URL;

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cookie parser middleware
app.use(cookieParser());

// Trust proxy for secure deployment environments
app.enable('trust proxy');

// Static file middleware
// Use the correct path to serve static files
app.use(express.static(path.join(__dirname, '../public')));

//JSON request limit to prevent large payloads.
app.use(
  express.json({
    limit: '10kb',
  })
);

//Proxy Trust Configuration
app.enable('trust proxy');

//allowing the server to respond to requests from different origins
app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Parse URL-encoded data into req.body
app.use(express.urlencoded({ extended: true }));

app.use(SetHeader);

// Routes
app.use('/api', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/offers', promotionalRouter);

// Error handling
app.use(errorHandler);
export default app;
