import { Request,Response} from "express";
import Notification from "./notification.model";
//obtener todas las notificaciones
export async function getAllNotification(_req:Request, res:Response): Promise<Response>{
    try{
        const Notifications = await Notification.find().sort({creado:-1});
        return res.status(200).json(Notifications);
    }catch(error:any){
        console.error('error al obtener notificaciones',error);
        return res.status(500).json({
            message: 'error al obtener notificaciones',
            error: error.message,
        });
    }
}

export async function getNotificationByType(req:Request, res:Response):Promise<Response>{
    try{
        const {notification_type}= req.params;
        const Notifications = await Notification.find({notification_type:notification_type}).sort({creado:-1});   
        if(Notifications.length===0){
            return res.status(404).json({
                message:'no se encontraron notificaciones de este tipo'
            })
        }return res.status(200).json(Notifications);
    }catch(error:any){
        console.error('error al obtener notificaciones de este tipo',error);
        return res.status(500).json({
            message: 'error al obtener notificaciones de este tipo',
            error: error.message,
        });
    }

    
}
    
