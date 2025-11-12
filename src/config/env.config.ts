import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 4000;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3010';
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://anonimos:cTlHxrNuJCM59jcH@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo-shard-0';
