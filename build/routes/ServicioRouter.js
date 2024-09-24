"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Servicio_controller_1 = __importDefault(require("../controllers/Servicio_controller"));
const router = express_1.default.Router();
router.post("/crear", Servicio_controller_1.default.crearServicio);
router.put("/actualizar/:id?", Servicio_controller_1.default.actualizarServicio);
router.get("/get-all", Servicio_controller_1.default.leerServicios);
router.get("/get-by-id/:id", Servicio_controller_1.default.leerServiciosById);
router.delete("/delete-by-id/:id", Servicio_controller_1.default.borrarServicio);
exports.default = router;
