import 'dotenv/config';
import app from './src/app.js';
import mongoose from 'mongoose';
const DB = process.env.DB;
const PORT = process.env.PORT || 8000;
if (DB) {
    mongoose
        .connect(DB)
        .then(() => console.log('DB successfully connected✅'))
        .catch((e) => console.log(e.message + '❌'));
    const SERVER = app.listen(PORT, () => {
        console.log(`APP is running on port: ${PORT}`);
    });
}
//# sourceMappingURL=server.js.map