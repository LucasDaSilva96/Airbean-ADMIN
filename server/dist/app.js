import express from 'express';
import cors from 'cors';
const app = express();
//JSON request limit to prevent large payloads.
app.use(express.json({
    limit: '10kb',
}));
//Proxy Trust Configuration
app.enable('trust proxy');
//allowing the server to respond to requests from different origins
app.options('*', cors());
export default app;
//# sourceMappingURL=app.js.map