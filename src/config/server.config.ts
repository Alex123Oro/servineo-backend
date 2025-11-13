import express from 'express';
import cors from 'cors';
import AppRoutes from './server.routes.js'; // <-- Agregamos .js
import { CLIENT_URL } from './env.config.js';

const app = express();
// Permitir tanto CLIENT_URL como puertos comunes de dev
const allowedOrigins = new Set([CLIENT_URL, 'http://localhost:3000', 'http://localhost:3010']);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error(`CORS bloqueado para origen: ${origin}`));
  },
  credentials: true,
}));
// Soporte para formularios tradicionales (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
// Soporte para JSON
app.use(express.json());
app.use(AppRoutes);

export default app;
