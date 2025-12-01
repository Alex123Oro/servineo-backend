import { Router } from 'express';
import { verifyJWT } from '../../controllers/userManagement/google.controller';
import { deleteAccountController } from '../../controllers/userManagement/deleteAccount.controller';
import { connectDB } from '../../../config/db/mongoClient';
import { ObjectId } from 'mongodb';

const router = Router();

router.delete('/delete-account', verifyJWT, deleteAccountController);

router.get('/profile', verifyJWT, async (req, res) => {
  try {
    const decoded: any = (req as any).user;
    const userId = decoded?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    const db = await connectDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(String(userId)) });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    let firstName = (user as any).firstName || undefined;
    let lastName = (user as any).lastName || undefined;
    const nombre = firstName || undefined;
    const apellido = lastName || undefined;
    let name = (user as any).name || [firstName, lastName].filter(Boolean).join(' ').trim();

    if ((!firstName || !lastName) && name) {
      const parts = String(name).trim().split(/\s+/);
      if (!firstName) firstName = parts[0] || undefined;
      if (!lastName) lastName = parts.slice(1).join(' ') || undefined;
    }

    return res.json({
      success: true,
      user: {
        _id: String(user._id),
        email: user.email,
        name,
        firstName,
        lastName,
        nombre,
        apellido,
        picture: user.url_photo || '',
        url_photo: user.url_photo || '',
      },
    });
  } catch (err: any) {
    console.error('Error en GET /usuario/profile:', err);
    return res.status(500).json({ success: false, message: err.message || 'Error interno' });
  }
});

export default router;
