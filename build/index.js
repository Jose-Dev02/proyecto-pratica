"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/connection");
const CargoRouter_1 = __importDefault(require("./routes/CargoRouter"));
const DepartamentoRouter_1 = __importDefault(require("./routes/DepartamentoRouter"));
const DependencyRouter_1 = __importDefault(require("./routes/DependencyRouter"));
const MaquinaRouter_1 = __importDefault(require("./routes/MaquinaRouter"));
const RolRouter_1 = __importDefault(require("./routes/RolRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const TrabajadorRouter_1 = __importDefault(require("./routes/TrabajadorRouter"));
const ServicioRouter_1 = __importDefault(require("./routes/ServicioRouter"));
dotenv_1.default.config({ path: "./Globals.env" });
const PORT = process.env.SERVER_PORT ?? 3000;
(0, connection_1.connection)();
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    return res.send("<h1>Api de Practica</h1>");
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use("/api/cargo", CargoRouter_1.default);
app.use("/api/departamento", DepartamentoRouter_1.default);
app.use("/api/dependency", DependencyRouter_1.default);
app.use("/api/maquina", MaquinaRouter_1.default);
app.use("/api/rol", RolRouter_1.default);
app.use("/api/user", UserRouter_1.default);
app.use("/api/trabajador", TrabajadorRouter_1.default);
app.use("/api/servicio", ServicioRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server en Puerto: ${PORT} OnDate: ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
});
