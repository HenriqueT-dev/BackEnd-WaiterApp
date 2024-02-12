import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = 3001;
    console.log('aparentemente tudo ok');

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static('../api/uploads'));
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`🔥 server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log('Erro ao conectar ao mongodb' + error.message));

//'mongodb+srv://pauloha676:x1aa1gyBtBDqYv03@waiterapp.qixo5ll.mongodb.net/waiterapp?retryWrites=true&w=majority'


