import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from 'bull-board';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import mailQueue from './queues/mailQueue.js';
import apiRouter from './routes/apiRoutes.js';
const app = express();



app.use(express.json());
app.use(express.urlencoded());

const bullServerAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  bullServerAdapter
})

app.use('./ui', bullServerAdapter.getRouter());
 
app.use('/api', apiRouter);
app.use('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong' });
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
