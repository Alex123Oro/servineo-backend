import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes.js'; // <-- Agregamos .js
import { CLIENT_URL } from './env.config.js';

const app = express();
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(AppRoutes);

export default app;
