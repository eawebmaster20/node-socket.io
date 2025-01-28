const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
var admin = require("firebase-admin");
var bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelizeWithUrl = new Sequelize('postgresql://postgres:YTGBkitMWNMvQFlNaZVgESznGdgmTZzB@junction.proxy.rlwy.net:57163/railway')
const sequelize = new Sequelize('railway', 'postgres', 'YTGBkitMWNMvQFlNaZVgESznGdgmTZzB', {
  host: 'postgres-gtqw.railway.internal:5432',
  dialect: 'postgres'
});

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

app.get('/', (req, res)=>{
  res.json('server is working so, Hola!');
})
// const server = http.createServer(app);

// // Configure Socket.IO with CORS
// const io = new Server(server, {
//   cors: {
//     origin: true, // Replace with your Angular app's URL
//     methods: ['GET', 'POST'],       // Allowed HTTP methods
//     allowedHeaders: ['Content-Type'], // Allowed headers
//     credentials: true               // Allow cookies and credentials
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen to events
//   socket.on('message', (msg) => {
//     console.log('Message received:', msg);
//     const payload = {
//       title: msg.title || 'notification app',
//       description: msg.body || 'transformer voltage is 300v',
//       img: '',
//       time: new Date().toISOString(),
//       status: 'warning', 
//     }
//     // Emit an event to all clients
//     io.emit('message', payload);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Socket.IO server is running on port ${PORT}`);
// });
async function startSequelize(){
  // console.log(process.env);
  try {
    await sequelizeWithUrl.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startSequelize();
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})
