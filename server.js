const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Archivos estáticos
app.use(express.static(path.join(__dirname)));

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





io = new Server(httpServer);

// Sirve los archivos desde la carpeta actual


 fb5f71d49f866e061c2071e9095736c6961738bc
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
 function entrarSala() {
    const salaInput = document.getElementById('nombreSala').value; // El input donde escribes la sala
    if (salaInput) {
        console.log("Enviando evento join-room con sala:", salaInput);
        socket.emit('join-room', salaInput);
    } else {
        alert("Escribe un nombre de sala válido");
    }
}
 
// --- TODO LO DE SOCKETS VA DENTRO DE ESTE BLOQUE ---





 

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

 


const socket = io('https://p2pp-fz5u.onrender.com:10000', {
    transports: ['websocket', 'polling']
});
// --------------------------------------------------
socket.on('offer', async (offer) => {
    console.log("¡Oferta recibida del otro usuario!");
    if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    }
    createPeerConnection();
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, room: currentRoom });
});

socket.on('answer', async (answer) => {
    console.log("¡Respuesta recibida del otro usuario!");
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('ice-candidate', async (candidate) => {
    console.log("Candidato ICE recibido");
    if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
});






// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
fb5f71d49f866e061c2071e9095736c6961738bc
