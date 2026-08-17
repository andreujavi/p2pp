const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: '*',
    methods: ['GET', 'POST']
  } 
});





// Configurar la carpeta actual como pública para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta explícita para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// (Aquí debajo mantén el resto de tu código de Socket.io y el listen del puerto)

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

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

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});