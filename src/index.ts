import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./database/connection";
import CargoRouter from "./routes/CargoRouter";
import DepartamentoRouter from "./routes/DepartamentoRouter";
import DependencyRouter from "./routes/DependencyRouter";
import MaquinaRouter from "./routes/MaquinaRouter";
import RolRouter from "./routes/RolRouter";
import UserRouter from "./routes/UserRouter";
import TrabajadorRouter from "./routes/TrabajadorRouter";
import ServicioRouter from "./routes/ServicioRouter";

dotenv.config({ path: "./Globals.env" });

const PORT = process.env.SERVER_PORT ?? 3000;

connection();

const app = express();
app.get("/", (_req, res) => {
  return res.send("<h1>Api de Practica</h1>");
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/cargo", CargoRouter);
app.use("/api/departamento", DepartamentoRouter);
app.use("/api/dependency", DependencyRouter);
app.use("/api/maquina", MaquinaRouter);
app.use("/api/rol", RolRouter);
app.use("/api/user", UserRouter);
app.use("/api/trabajador", TrabajadorRouter);
app.use("/api/trabajador", ServicioRouter);

app.listen(PORT, () => {
  console.log(
    `Server en Puerto: ${PORT} OnDate: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );
});
