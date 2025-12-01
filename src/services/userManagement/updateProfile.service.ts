import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectDB } from "../../config/db/mongoClient";
import type { JWTDecoded, UserUpdateData, AnyObject } from "../../types/common.types";
import { processAndValidateImage } from "./fotoPerfil.service";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export async function updateProfileService(token: string, data: UserUpdateData) {
  const decoded = jwt.verify(token, JWT_SECRET) as JWTDecoded;
  const db = await connectDB();

  const userId = decoded.id;

  const updateData: AnyObject = {};

  const rawFirst = (data.firstName as string) || (data as any).nombre || (data as any).name;
  const rawLast =
    (data.lastName as string) ||
    (data as any).apellido ||
    (data as any).apellidos ||
    ([ (data as any).apellidoPaterno, (data as any).apellidoMaterno ].filter(Boolean).join(' ') || undefined) ||
    (data as any).surname ||
    (data as any).last_name;
  const fullName = (data as any).name || [rawFirst, rawLast].filter(Boolean).join(' ').trim();

  if (rawFirst) updateData.firstName = rawFirst;
  if (rawLast) updateData.lastName = rawLast;
  if (fullName) updateData.name = fullName;
  if (data.email) updateData.email = data.email;
  if (data.phone) updateData.telefono = data.phone;
  
  // Procesar y validar imagen si viene en el request.
  // Soportar varios nombres que el frontend puede enviar: `avatar`, `photo`, `fotoPerfil`.
  const incomingImage = (data as Record<string, unknown>).avatar
    || (data as Record<string, unknown>).photo
    || (data as Record<string, unknown>).fotoPerfil;

  if (incomingImage && typeof incomingImage === 'string') {
    try {
      updateData.url_photo = await processAndValidateImage(incomingImage as string);
    } catch (error) {
      console.error("Error procesando imagen en updateProfile:", error);
      throw error;
    }
  }

  if ((data as Record<string, unknown>).ubicacion) {
    const ubicacion = (data as Record<string, unknown>).ubicacion as Record<string, unknown>;
    updateData.ubicacion = {
      lat: (ubicacion.lat as number) || 0,
      lng: (ubicacion.lng as number) || 0,
      direccion: (ubicacion.direccion as string) || "",
      departamento: (ubicacion.departamento as string) || "",
      pais: (ubicacion.pais as string) || "",
    };
  }

  await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: updateData }
  );

const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });

if (!updatedUser) {
  throw new Error("Usuario no encontrado");
}

delete (updatedUser as Record<string, unknown>).password;

return {
  ...updatedUser,
  usuarioId: updatedUser._id?.toString(),
};

}
