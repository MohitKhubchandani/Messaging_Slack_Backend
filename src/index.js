
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import channelSocketHandlers from './controllers/channelSocketController.js';
import messageSocketHandlers from './controllers/messageSocketController.js';
import apiRouter from './routes/apiRoutes.js';
const app = express();
const server = createServer(app);
const io = new Server(server)

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// Bull board
app.use('/ui', bullServerAdapter.getRouter());
 
// Routes
app.use('/api', apiRouter);
app.use('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong' });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  io.emit('message', 'Hello from server');
  messageSocketHandlers(io, socket);
  channelSocketHandlers(io, socket);
})
  
// Start the server
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
