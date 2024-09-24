"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Dependency_controller_1 = __importDefault(require("../controllers/Dependency_controller"));
const router = express_1.default.Router();
router.post("/crear", Dependency_controller_1.default.crearDependency);
router.put("/actualizar/:id?", Dependency_controller_1.default.actualizarDependency);
router.get("/get-all", Dependency_controller_1.default.leerDependencys);
router.get("/get-by-id/:id", Dependency_controller_1.default.leerDependencysById);
router.delete("/delete-by-id/:id", Dependency_controller_1.default.borrarDependency);
exports.default = router;
