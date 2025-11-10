import mongoose, {Schema,Document,Model} from 'mongoose';
//interfaz para el documento de notificaciones
export interface Inotification extends Document{
    creado: Date;
    estado: String;
    siguiente?: String;
    tipo: String;
    users_id: mongoose.Types.ObjectId;
}
//esquema de mongoose
const notificationSchema = new Schema <Inotification> (
    {
        
    }
)