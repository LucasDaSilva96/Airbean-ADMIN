import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './controllers/errorHandlingController.js';
import cookieParser from 'cookie-parser';
import { menuRouter } from './routes/menuRoutes.js';
import { promotionalRouter } from './routes/Promotional_offers_Routes.js';
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
app.use('/api/menu', menuRouter);
app.use('/api/offers', promotionalRouter);
// Error handling
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map