import { Socket } from "socket.io";

const socketController = (socket = new Socket(), io) => {
    console.log('Client connected', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    socket.on('message', (payload) => {
        console.log(payload);
    });
}

export default socketController;