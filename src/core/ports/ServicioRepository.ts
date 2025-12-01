import { Servicio } from "../entities/Servicio";

export interface ServicioRepository {
  save(_servicio: Servicio): Promise<{ insertedId: string }>;
}
