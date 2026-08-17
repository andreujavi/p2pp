const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Configurar archivos estáticos y ruta principal
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestión de conexiones WebSockets (Socket.io)
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    // AQUÍ DENTRO debe ir todo lo relacionado con 'socket.on'
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Usuario ${socket.id} se unió a la sala: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});