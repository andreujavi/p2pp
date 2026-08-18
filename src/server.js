const express = require('express');
const http = require('http');
const path = require('path'); // <--- ¡Esta línea es la que falta y causa el error!
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos desde la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Cambia 'tu-archivo.html' por el nombre real de tu archivo
});

// Configuración de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Usuario unido a la sala: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n=============================================`);
    console.log(` SERVIDOR MULTIMEDIA ACTIVO Y REAL`);
    console.log(`=============================================`);
    console.log(`> Abre en tu PC: http://localhost:${PORT}`);
    console.log(`> Abre en tu Móvil/Tablet: http://192.168.1.150:${PORT}`);
    console.log(`=============================================0\n`);
});