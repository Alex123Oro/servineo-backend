import clientPromise from '../../config/db/mongodb';
import { ObjectId } from 'mongodb';
import sharp from 'sharp';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const PROFILE_PHOTO_SIZE = 400; // píxeles para el círculo de perfil
const ALLOWED_FORMATS = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg'];

/**
 * Valida y procesa una imagen base64
 * - Valida formato (PNG, JPG, WEBP)
 * - Valida tamaño
 * - Redimensiona a tamaño de perfil
 * - Comprime la imagen
 * @returns base64 comprimida y redimensionada
 */
export async function processAndValidateImage(base64Image: string): Promise<string> {
  try {
    // Extraer la data de base64
    const matches = base64Image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Formato de imagen base64 inválido');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Validar MIME type
    if (!ALLOWED_FORMATS.includes(mimeType)) {
      throw new Error(`Formato no permitido. Usa PNG, JPG o WEBP. Recibido: ${mimeType}`);
    }

    // Convertir base64 a Buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Validar tamaño
    if (imageBuffer.length > MAX_FILE_SIZE) {
      throw new Error(`Archivo muy grande. Máximo permitido: 5MB. Tamaño: ${(imageBuffer.length / 1024 / 1024).toFixed(2)}MB`);
    }

    // Procesar imagen: redimensionar y comprimir
    const processedBuffer = await sharp(imageBuffer)
      .resize(PROFILE_PHOTO_SIZE, PROFILE_PHOTO_SIZE, {
        fit: 'cover', // Ajusta al círculo sin distorsión
        position: 'center',
      })
      .webp({ quality: 80, effort: 6 }) // Convertir a WebP comprimido
      .toBuffer();

    // Convertir a base64
    const processedBase64 = `data:image/webp;base64,${processedBuffer.toString('base64')}`;

    console.log(`[fotoPerfil.service] Imagen procesada: ${(imageBuffer.length / 1024).toFixed(2)}KB → ${(processedBuffer.length / 1024).toFixed(2)}KB`);

    return processedBase64;
  } catch (error) {
    console.error('[fotoPerfil.service] Error procesando imagen:', error);
    throw error;
  }
}

export async function updateUserPhoto(usuarioId: string, fotoPerfil: string): Promise<boolean> {
  try {
    // Procesar y validar la imagen
    const processedImage = await processAndValidateImage(fotoPerfil);

    const mongoClient = await clientPromise;
    const db = mongoClient.db('ServineoBD');
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { _id: new ObjectId(usuarioId) },
      {
        $set: {
          url_photo: processedImage,
        },
      },
    );

    if (result.matchedCount === 0) {
      console.warn(`[fotoPerfil.service] Usuario no encontrado: ${usuarioId}`);
      return false;
    }

    console.log(`[fotoPerfil.service] Foto de perfil actualizada para usuario: ${usuarioId}`);
    return true;
  } catch (error) {
    console.error('[fotoPerfil.service] Error actualizando foto de perfil:', error);
    throw error;
  }
}
