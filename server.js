
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// 1. Configurar la ruta de archivos estáticos
// Si tu index.html está en la raíz del proyecto, usa '__dirname'. 
// Si estuviera dentro de 'src', cambia a path.join(__dirname, 'src')
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Gestión de conexiones WebSockets (Socket.io)
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// 3. Iniciar el servidor (Declarado una única vez con httpServer)
const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});




  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`Usuario ${socket.id} unido a la sala:${room}`);
  });

  socket.on('offer', ({ offer, room }) => {
    socket.to(room).emit('offer', offer);
  });

  socket.on('answer', ({ answer, room }) => {
    socket.to(room).emit('answer', answer);
  });

  socket.on('ice-candidate', ({ candidate, room }) => {
    socket.to(room).emit('ice-candidate', candidate);
  });

  socket.on('chat-message', ({ room, message, sender }) => {
    socket.to(room).emit('message', { sender, message });
  });

 


