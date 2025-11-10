import { Sign } from 'crypto';
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaz para el documento de Notificación
export interface INotification extends Document {
  appointment_id: any;
  creado: Date;
  createdAt: any;
  error_details: any;
  estado: string;
  message_content: any;
  notification_type: any;
  recipient_phone: any;
  send_status: any;
  siguiente?: string;
  tipo: string;
  updatedAt: any;
  users_id: mongoose.Types.ObjectId;
  leido: boolean;
}
// esquema de mongoose
const notificationSchema= new Schema <INotification>
(
    {
        appointment_id: {
            type: mongoose.Schema.Types.Mixed
        },
        creado: {
            type: mongoose.Schema.Types.Mixed
        },
        createdAt: {
            type: mongoose.Schema.Types.Mixed
        },
        error_details: {
            type: mongoose.Schema.Types.Mixed
        },
        estado: {
            type: mongoose.Schema.Types.Mixed
        },
        message_content: {
            type: mongoose.Schema.Types.Mixed
        },
        notification_type: {
            type: mongoose.Schema.Types.Mixed
        },
        recipient_phone: {
            type: mongoose.Schema.Types.Mixed
        },
        send_status: {
            type: mongoose.Schema.Types.Mixed
        },
        siguiente: {
            type: mongoose.Schema.Types.Mixed
        },
        tipo: {
            type: mongoose.Schema.Types.Mixed
        },
        updatedAt: {
            type: mongoose.Schema.Types.Mixed
        },
        users_id: {
            type: mongoose.Schema.Types.Mixed
        },
        leido:{
            type: Boolean,default:false,required:true
        }


    },{
        timestamps:false, //desactivamos los timestamps porque ya estan en el esquema
        strict:false, //mongoose no tocara el esquema 
    }

);
// modelo de mongoose 
const Notification: Model<INotification> = mongoose.model<INotification>('Notification',notificationSchema);
export default Notification; 