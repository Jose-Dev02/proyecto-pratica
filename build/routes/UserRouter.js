"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_controller_1 = __importDefault(require("../controllers/User_controller"));
const router = express_1.default.Router();
router.post("/crear", User_controller_1.default.crearUser);
router.put("/actualizar/:id?", User_controller_1.default.actualizarUser);
router.get("/get-all", User_controller_1.default.leerUsers);
router.get("/get-by-id/:id", User_controller_1.default.leerUsersById);
router.delete("/delete-by-id/:id", User_controller_1.default.borrarUser);
exports.default = router;
