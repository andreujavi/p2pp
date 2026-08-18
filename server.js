const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos desde la carpeta actual o src
app.use(express.static(path.join(__dirname)));

// Configuración de eventos en tiempo real con Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    // Evento para unirse a una sala específica (útil para tu app P2P/chat)
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Usuario ${socket.id} unido a la sala: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Configuración del puerto compatible con Render y entorno local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});