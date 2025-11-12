import { Request, Response } from 'express';
import { connectDB } from '../login/src/config/db/mongoClient.js';

export function getHealthStatusController(_req: Request, res: Response) {
  return res.status(200).json({
    healt: "i'm alive",
    status: 200,
    message: 'ok',
  });
}

export async function getDbHealthController(_req: Request, res: Response) {
  try {
    const db = await connectDB();
    // lectura mínima: contar usuarios (no falla aunque esté vacío)
    const count = await db.collection('users').countDocuments({});
    return res.status(200).json({
      db: 'ok',
      collection: 'users',
      count,
    });
  } catch (err: any) {
    return res.status(500).json({ db: 'error', message: err?.message || 'DB unreachable' });
  }
}
