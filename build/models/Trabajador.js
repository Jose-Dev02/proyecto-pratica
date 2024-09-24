"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TrabajadorSchema = new mongoose_1.Schema({
    id_Departamento: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Departamento",
    },
    id_Rol: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Rol",
    },
    id_Cargo: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Cargo",
    },
    id_usuario: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
    },
});
exports.default = (0, mongoose_1.model)("Trabajador", TrabajadorSchema);
