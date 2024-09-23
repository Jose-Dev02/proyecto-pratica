import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({ path: './Globals.env' });

const localStringConnecion = process.env.DB_STRING_CONNECTION ?? "";

const connection = async () => {

    try {
        await mongoose.connect(localStringConnecion);
        console.log("Conectado correctamente a la Base de Datos");
    } catch (error: any) {
        console.log(error.message);
    }
}

export { connection };