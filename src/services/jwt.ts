import jwt from "jwt-simple";
import  moment from "moment";
import dotenv from 'dotenv';

dotenv.config({ path: './Globals.env' });

const clave_secreta = process.env.CLAVE_SECRETA
console.log(jwt,moment,clave_secreta)