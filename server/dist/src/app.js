import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './controllers/errorHandlingController.js';
import cookieParser from 'cookie-parser';
const app = express();
// Cookie parser middleware
app.use(cookieParser());
// Static file middleware
app.use(express.static('../public'));
//JSON request limit to prevent large payloads.
app.use(express.json({
    limit: '10kb',
}));
//Proxy Trust Configuration
app.enable('trust proxy');
//allowing the server to respond to requests from different origins
app.options('*', cors());
// Routes
app.use('/api', authRouter);
// Error handling
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map