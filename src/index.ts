import Server from './config/server.config';
import { SERVER_PORT } from './config/env.config';
import {conectarMongo} from './config/mongo.config';


async function startServer() {
  try {
    await conectarMongo();//conectar mongo antes de iniciar servidor
    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }
} 

startServer(); 