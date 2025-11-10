import Mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export async function conectarMongo ():Promise<void> {
    try{
       const uri = `mongodb+srv://bytesboys:r2ErwHSPQuCQzh8V@clusterservineo.yotr2ip.mongodb.net/ServineoBD?retryWrites=true&w=majority&appName=ClusterServineo`;
        await Mongoose.connect(uri);
        console.log('mongoConectado');
    }catch (error:any){
        console.log('mongoError');
    }
}