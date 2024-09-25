"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Trabajador_controller_1 = __importDefault(require("../controllers/Trabajador_controller"));
const router = express_1.default.Router();
router.post("/crear", Trabajador_controller_1.default.crearTrabajador);
router.put("/actualizar/:id?", Trabajador_controller_1.default.actualizarTrabajador);
router.get("/get-all", Trabajador_controller_1.default.leerTrabajadors);
router.get("/get-by-id/:id", Trabajador_controller_1.default.leerTrabajadorsById);
router.get("/find/:find", Trabajador_controller_1.default.finder);
router.delete("/delete-by-id/:id", Trabajador_controller_1.default.borrarTrabajador);
exports.default = router;
