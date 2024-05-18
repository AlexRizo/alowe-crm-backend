import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import AuthRoutes from './routes/auth.js';
import EventRoutes from './routes/events.js';
import dbConnection from './database/config.js';

dotenv.config();

const app = express();

app.use(cors());

dbConnection();

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api/events', EventRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${ process.env.PORT }`);
});