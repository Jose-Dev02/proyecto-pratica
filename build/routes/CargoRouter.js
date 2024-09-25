"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cargo_controller_1 = __importDefault(require("../controllers/Cargo_controller"));
const router = express_1.default.Router();
router.post("/crear", Cargo_controller_1.default.crearCargo);
router.put("/actualizar/:id?", Cargo_controller_1.default.actualizarCargo);
router.get("/get-all", Cargo_controller_1.default.leerCargos);
router.get("/get-by-id/:id", Cargo_controller_1.default.leerCargosById);
router.get("/find/:find", Cargo_controller_1.default.finder);
router.delete("/delete-by-id/:id", Cargo_controller_1.default.borrarCargo);
exports.default = router;
