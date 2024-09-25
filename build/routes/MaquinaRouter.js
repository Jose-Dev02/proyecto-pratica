"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Maquina_controller_1 = __importDefault(require("../controllers/Maquina_controller"));
const router = express_1.default.Router();
router.post("/crear", Maquina_controller_1.default.crearMaquina);
router.put("/actualizar/:id?", Maquina_controller_1.default.actualizarMaquina);
router.get("/get-all", Maquina_controller_1.default.leerMaquinas);
router.get("/get-by-id/:id", Maquina_controller_1.default.leerMaquinasById);
router.get("/find/:find", Maquina_controller_1.default.finder);
router.delete("/delete-by-id/:id", Maquina_controller_1.default.borrarMaquina);
exports.default = router;
