const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir la página web desde la misma carpeta
app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
    console.log(`> Dispositivo conectado: ${socket.id}`);

    // Retransmitir mensajes de texto del chat
    socket.on('chat_message', (data) => {
        socket.broadcast.emit('chat_message', data);
    });

    // Retransmitir el vídeo y audio de la cámara en vivo
    socket.on('video-stream', (data) => {
        socket.broadcast.emit('video-stream', {
            id: socket.id,
            image: data.image
        });
    });

    socket.on('disconnect', () => {
        console.log(`> Dispositivo desconectado: ${socket.id}`);
        socket.broadcast.emit('user-disconnected', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n=============================================`);
    console.log(` SERVIDOR MULTIMEDIA ACTIVO Y REAL`);
    console.log(`=============================================`);
    console.log(`> Abre en tu PC: http://localhost:${PORT}`);
    console.log(`> Abre en tu Móvil/Tablet: http://[IP-DE-TU-PC]:${PORT}`);
    console.log(`=============================================0\n`);
});