import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { connection } from "./database/connection";
import CargoRouter from './routes/CargoRouter';

dotenv.config({ path: './Globals.env' });

const PORT = process.env.SERVER_PORT ?? 3000;

connection();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/cargo",CargoRouter )



app.listen(PORT, () =>{
    console.log(`Server en Puerto: ${PORT} OnDate: ${new Date().toLocaleDateString()}`)
})


