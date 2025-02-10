
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';
const app = express();
const server = createServer(app);
const io = new Server(server)


app.use(express.json());
app.use(express.urlencoded({ extended : true}));


app.use('/ui', bullServerAdapter.getRouter());
 
app.use('/api', apiRouter);
app.use('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong' });
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  io.emit('message', 'Hello from server');

  socket.on('messageFromClient', (data) => {
    console.log('Message from client',data);

    socket.broadcast.emit('new message', data.toUpperCase());
  })
  
})
  

server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
