"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Rol_controller_1 = __importDefault(require("../controllers/Rol_controller"));
const router = express_1.default.Router();
router.post("/crear", Rol_controller_1.default.crearRol);
router.put("/actualizar/:id?", Rol_controller_1.default.actualizarRol);
router.get("/get-all", Rol_controller_1.default.leerRols);
router.get("/get-by-id/:id", Rol_controller_1.default.leerRolsById);
router.delete("/delete-by-id/:id", Rol_controller_1.default.borrarRol);
exports.default = router;
