// src/index.ts
// This file is deprecated. Use src/server.ts instead.
// Kept for backwards compatibility during migration.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import registrarDatosRouter from './api/routes/userManagement/registrarDatos.routes.js';
import fotoPerfilRouter from './api/routes/userManagement/fotoPerfil.routes.js';
import googleRouter from './api/routes/userManagement/google.routes.js';
import ubicacionRouter from './api/routes/userManagement/ubicacion.routes.js'; 
import authRouter from './api/routes/userManagement/login.routes.js'; 
import modificarDatosRouter from './api/routes/userManagement/modificarDatos.routes.js';
import nominatimRouter from './api/routes/userManagement/sugerencias.routes.js'; 
import deviceRouter from './api/routes/userManagement/device.routes.js';
import cambiarContrasenaRouter from './api/routes/userManagement/editarContraseña.routes.js';
import cerrarSesionesRouter from './api/routes/userManagement/cerrarSesiones.routes.js';
import ultimoCambioRouter from './api/routes/userManagement/ultimoCambio.routes.js';
import githubAuthRouter from './api/routes/userManagement/github.routes.js';
import discordRoutes from './api/routes/userManagement/discord.routes.js';
import clienteRouter from './api/routes/userManagement/cliente.routes.js';
import obtenerContrasenaRouter from './api/routes/userManagement/obtener.routes.js';


const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

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
app.use('/api/controlC/obtener-password', obtenerContrasenaRouter);
app.use('/auth', githubAuthRouter);
app.use('/auth', discordRoutes);
app.use('/api/controlC/cliente', clienteRouter);
export const registerRoutes = (app: any) => {
  app.use('/devices', deviceRouter);
};

app.listen(8000, () => console.log('Servidor corriendo en puerto 8000'));