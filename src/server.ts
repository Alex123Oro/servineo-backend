import { SERVER_PORT } from './config/env.config';
import app from './app';
import { connectDatabase } from './config/db.config';
import { connectDB } from './config/db/mongoClient';
import { startJobsStatusCollectorCron } from './services/jobs-status-collector.cron';

// 🚀 Función para iniciar el servidor (local)
async function startServer() {
  try {
    // 🔌 1️⃣ Conectamos a la base de datos antes de iniciar el servidor
    await connectDatabase();
    await connectDB();

    // 🚀 2️⃣ Iniciamos el servidor Express
    app.listen(SERVER_PORT, () => {
      console.info(`✅ Server running on http://localhost:${SERVER_PORT}`);
    });

    // 📊 3️⃣ Iniciamos el cron job para recolección de estado de jobs
    startJobsStatusCollectorCron();
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'production') {
  startServer();
}

export default app;
