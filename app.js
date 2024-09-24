import dotenv from 'dotenv';
import { Server } from './models/index.js';

dotenv.config();

const app = new Server();

app.start();