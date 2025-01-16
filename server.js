const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
var admin = require("firebase-admin");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
  credentials: true, // Allow credentials
}));

const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: true, // Replace with your Angular app's URL
    methods: ['GET', 'POST'],       // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
    credentials: true               // Allow cookies and credentials
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen to events
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Emit an event to all clients
    io.emit('message', `Server received: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
