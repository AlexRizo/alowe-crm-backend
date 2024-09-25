import express from 'express';
import http from 'http';
import { Server as socketServer } from 'socket.io';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath, URL } from 'url';

import dbConnection from '../database/config.js';
import { AuthRoutes, EventsRoutes, TeamRoutes } from '../routes/index.js';
import socketController from '../sockets/socketController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = new socketServer(this.server, {
            /* options */
            cors: { 
                origin: process.env.CORS_ORIGIN,
                methods: ['GET', 'POST'],
            }
        });
        this.paths = {
            auth: '/api/auth',
            events: '/api/events',
            team: '/api/team',
        };
        this.connectDB();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }));
    }

    routes() {
        this.app.use(this.paths.auth, AuthRoutes);
        this.app.use(this.paths.events, EventsRoutes);
        this.app.use(this.paths.team, TeamRoutes);

        // this.app.get('*', (req, res) => {
        //     res.sendFile(path.join(__dirname, 'public/index.html'));
        // });
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${ this.port }`);
        });
    }
}

export default Server;