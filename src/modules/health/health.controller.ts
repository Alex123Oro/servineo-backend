import { Request, Response } from 'express';

export function getHealthStatusController(_req: Request, res: Response) {
  return res.status(200).json({
    healt: "i'm alive",
    status: 200,
    message: 'ok',
  });
}

// Controlador adicional para health DB; respuesta mínima para evitar errores de tipo.
export function getDbHealthController(_req: Request, res: Response) {
  return res.status(200).json({
    db: 'ok',
    status: 200,
    message: 'ok',
  });
}
