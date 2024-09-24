"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MaquinaSchema = new mongoose_1.Schema({
    id_Departamento: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Departamento",
    },
    name: {
        type: String,
        require: true,
    },
    direccion_ip: {
        type: String,
        require: true,
    },
    direccion_mac: {
        type: String,
        require: true,
    },
});
exports.default = (0, mongoose_1.model)("Maquina", MaquinaSchema);
