import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Helper: obtiene la primera variable definida entre las candidatas
function getEnvVar(...names: string[]): string {
  for (const name of names) {
    const v = process.env[name];
    if (typeof v === "string" && v.length > 0) return v;
  }
  throw new Error("❌ No se encontró MONGO_URI ni MONGODB_URI en variables de entorno");
}

const uri: string = getEnvVar("MONGO_URI", "MONGODB_URI");
const dbName: string = process.env.DB_NAME || "ServineoBD";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db && client) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();

    db = client.db(dbName);
    console.log(`✅ Conectado correctamente a MongoDB: ${dbName}`);
    return db;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    console.log("🔒 Conexión cerrada a MongoDB");
    client = null;
    db = null;
  }
}
