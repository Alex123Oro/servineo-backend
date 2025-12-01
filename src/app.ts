import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import HealthRoutes from './api/routes/health.routes';
import jobOfertRoutes from './api/routes/jobOfert.routes';
import newoffersRoutes from './api/routes/newOffers.routes';
import fixerRoutes from './api/routes/fixer.routes';
import activityRoutes from './api/routes/activities.routes';
import jobsRoutes from './api/routes/jobs.routes';
import searchRoutes from './api/routes/search.routes';

import registrarDatosRouter from './api/routes/userManagement/registrarDatos.routes';
import fotoPerfilRouter from './api/routes/userManagement/fotoPerfil.routes';
import googleRouter from './api/routes/userManagement/google.routes';
import ubicacionRouter from './api/routes/userManagement/ubicacion.routes';
import authRouter from './api/routes/userManagement/login.routes';
import modificarDatosRouter from './api/routes/userManagement/modificarDatos.routes';
import nominatimRouter from './api/routes/userManagement/sugerencias.routes';
import deviceRouter from './api/routes/userManagement/device.routes';
import cambiarContrasenaRouter from './api/routes/userManagement/editarContraseña.routes';
import cerrarSesionesRouter from './api/routes/userManagement/cerrarSesiones.routes';
import ultimoCambioRouter from './api/routes/userManagement/ultimoCambio.routes';
import githubAuthRouter from './api/routes/userManagement/github.routes';
import discordRoutes from './api/routes/userManagement/discord.routes';
import clienteRouter from './api/routes/userManagement/cliente.routes';
import obtenerContrasenaRouter from './api/routes/userManagement/obtener.routes';

import deleteAccountRoutes from './api/routes/userManagement/deleteAccount.routes';
import updateProfileRouter from './api/routes/userManagement/updateProfile.routes';

const app = express();

app.use(
  cors({
    origin: [
      'https://devmasters-servineo-frontend-zk3q.vercel.app',
      'https://servineo-frontend-inte.onrender.com',
      'https://servineo-frontend.onrender.com',
      'http://localhost:8080',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (origin) res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    return res.sendStatus(204);
  }
  next();
});

// Middleware para logging de requests (útil para debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - Origin: ${req.headers.origin || 'N/A'}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', HealthRoutes);
app.use('/api/devmaster', jobOfertRoutes);
app.use('/api/newOffers', newoffersRoutes);
app.use('/api/fixers', fixerRoutes);
app.use('/api', activityRoutes);
app.use('/api', jobsRoutes);
app.use('/api', searchRoutes);

app.use('/api/controlC/google', googleRouter);
app.use('/api/controlC/ubicacion', ubicacionRouter);
app.use('/api/controlC/auth', authRouter);
app.use('/api/controlC/registro', registrarDatosRouter);
app.use('/api/controlC/modificar-datos', modificarDatosRouter);
app.use('/api/controlC/sugerencias', nominatimRouter);
app.use('/api/controlC/cambiar-contrasena', cambiarContrasenaRouter);
app.use('/api/controlC/cerrar-sesiones', cerrarSesionesRouter);
app.use('/api/controlC/ultimo-cambio', ultimoCambioRouter);
app.use('/api/controlC/foto-perfil', fotoPerfilRouter);
app.use('/api/controlC/fotoPerfil', fotoPerfilRouter);
app.use('/api/controlC/obtener-password', obtenerContrasenaRouter);
app.use('/auth', githubAuthRouter);
app.use('/auth', discordRoutes);
app.use('/api/controlC/cliente', clienteRouter);

app.use('/api/controlC/usuario/update', updateProfileRouter);
app.use('/api/controlC/usuario', deleteAccountRoutes);

import { Express } from 'express';

export const registerRoutes = (app: Express) => {
  app.use('/devices', deviceRouter);
};

app.get('/', (_req, res) => {
  res.send('Servineo API running');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

// No iniciar el servidor aquí - se hace en server.ts
export default app;
