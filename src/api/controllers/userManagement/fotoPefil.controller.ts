import { Request, Response } from 'express';
import { updateUserPhoto } from '../../../services/userManagement/fotoPerfil.service';
import clientPromise from "../../../config/db/mongodb";
import { ObjectId } from 'mongodb';

export async function actualizarFotoPerfil(req: Request, res: Response) {
  try {
    // Aceptar varios nombres en el body: fotoPerfil, foto, photo o avatar
    const { usuarioId } = req.body;
    const fotoPerfil = req.body.fotoPerfil || req.body.photo || req.body.foto || req.body.avatar;

    if (!usuarioId || !fotoPerfil) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos: usuarioId o foto (campo esperado: fotoPerfil/photo/avatar).',
      });
    }

    // updateUserPhoto ahora lanza errores si la imagen no es válida
    const result = await updateUserPhoto(usuarioId, fotoPerfil);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.',
      });
    }

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

    return res.status(200).json({
      success: true,
      message: 'Foto de perfil actualizada correctamente.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        picture: user.url_photo,
        url_photo: user.url_photo,
        photo: user.url_photo,
        ubicacion: user.ubicacion ?? null,
      },
    });
  } catch (error) {
    // Errores de validación de imagen
    if (error instanceof Error && error.message.includes('Formato no permitido')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    if (error instanceof Error && error.message.includes('Archivo muy grande')) {
      return res.status(413).json({
        success: false,
        message: error.message,
      });
    }
    if (error instanceof Error && error.message.includes('Formato de imagen base64 inválido')) {
      return res.status(400).json({
        success: false,
        message: 'La imagen debe estar en formato base64 válido.',
      });
    }

    console.error('Error al actualizar la foto de perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al actualizar la foto.',
    });
  }
}
