import { Request, Response } from 'express';
import { updateUserPhoto } from '../../../services/userManagement/fotoPerfil.service';
import clientPromise from "../../../config/db/mongodb";
import { ObjectId } from 'mongodb';

export async function actualizarFotoPerfil(req: Request, res: Response) {
  try {
    const { usuarioId, fotoPerfil } = req.body;

    if (!usuarioId || !fotoPerfil) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos: usuarioId o fotoPerfil.',
      });
    }

    // 1. Actualizar foto
    const result = await updateUserPhoto(usuarioId, fotoPerfil);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.',
      });
    }

    // 2. Obtener usuario actualizado
    const mongoClient = await clientPromise;
    const db = mongoClient.db('ServineoBD');
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(usuarioId) });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado luego de actualizar.',
      });
    }

    // 3. Responder con datos compatibles con el frontend
    return res.status(200).json({
      success: true,
      message: 'Foto de perfil actualizada correctamente.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        picture: user.url_photo, // foto actualizada
        url_photo: user.url_photo,
        photo: user.url_photo, // compatibilidad con el frontend
        ubicacion: user.ubicacion ?? null
      }
    });
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al actualizar la foto.',
    });
  }
}
