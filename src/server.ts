import app from './app';
import { connectDatabase } from './config/db.config';
import { startJobsStatusCollectorCron } from './services/jobs-status-collector.cron';

// 🚀 Función para iniciar el servidor
async function startServer() {
  try {
    // 🔌 1️⃣ Conectamos a la base de datos antes de iniciar el servidor
    await connectDatabase();

    // 🚀 2️⃣ Obtenemos el puerto (Render usa process.env.PORT, local usa SERVER_PORT o 8000)
    const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 8000);

    // 🚀 3️⃣ Iniciamos el servidor Express
    app.listen(PORT, '0.0.0.0', () => {
      console.info(`✅ Server running on port ${PORT}`);
      console.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // 📊 4️⃣ Iniciamos el cron job para recolección de estado de jobs
    startJobsStatusCollectorCron();
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Iniciar el servidor siempre (tanto en desarrollo como en producción)
startServer();

export default app;
