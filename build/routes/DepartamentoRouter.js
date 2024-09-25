"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Departamento_controller_1 = __importDefault(require("../controllers/Departamento_controller"));
const router = express_1.default.Router();
router.post("/crear", Departamento_controller_1.default.crearDepartamento);
router.put("/actualizar/:id?", Departamento_controller_1.default.actualizarDepartamento);
router.get("/get-all", Departamento_controller_1.default.leerDepartamentos);
router.get("/get-by-id/:id", Departamento_controller_1.default.leerDepartamentosById);
router.get("/find/:find", Departamento_controller_1.default.finder);
router.delete("/delete-by-id/:id", Departamento_controller_1.default.borrarDepartamento);
exports.default = router;
