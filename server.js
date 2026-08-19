const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos desde la raíz


app.use(express.static(path.join(__dirname)));
// Configuración de eventos en tiempo real con Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    // Unirse a una sala específica
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log(`Usuario ${socket.id} unido a la sala: ${room}`);
        
        // Opcional: Avisar a otros en la sala que alguien nuevo entró
        socket.to(room).emit('user-joined', socket.id);
    });

    // 1. REENVIAR OFERTA WEBRTC (Cámara)
    socket.on('offer', (data) => {
        // data debe contener { room, offer } o similar
        socket.to(data.room).emit('offer', data.offer);
    });

    // 2. REENVIAR RESPUESTA WEBRTC (Cámara)
    socket.on('answer', (data) => {
        socket.to(data.room).emit('answer', data.answer);
    });

    // 3. REENVIAR CANDIDATOS ICE (Conexión de red P2P)
    socket.on('ice-candidate', (data) => {
        socket.to(data.room).emit('ice-candidate', data.candidate);
    });

    // 4. REENVIAR MENSAJES DE TEXTO DEL CHAT
    socket.on('chat-message', (data) => {
        // data debe contener { room, message, sender }
        io.to(data.room).emit('chat-message', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

