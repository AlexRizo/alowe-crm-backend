import { Socket } from "socket.io";

const socketController = (socket = new Socket(), io) => {
    socket.on('connect', () => {
        console.log('Client connected');
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}

export default socketController;