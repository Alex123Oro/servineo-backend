import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import registrarDatosRouter from './modules/controlC/HU1/registrarDatos/routes.js';
import googleRouter from './modules/controlC/HU3/google/routes.js';
import ubicacionRouter from './modules/controlC/HU3/ubicacion/routes.js';
import authRouter from './modules/controlC/HU4/auth/auth.routes.js';
import modificarDatosRouter from './modules/controlC/HU5/modificarDatos/routes.js';
import nominatimRouter from './modules/controlC/HU5/sugerencias/routes.js'; // si lo separaste
import cambiarContrasenaRouter from './modules/controlC/HU8/editarContraseña/routes.js';

///////////////////
import obtenerContrasenaRouter from './modules/controlC/HU8/obtener/routes.js';
/////////////////////////
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

////////////////////
app.use('/api/controlC/obtener-password', obtenerContrasenaRouter);
////////////////////

app.listen(4000, () => console.log('Servidor corriendo en puerto 4000'));
