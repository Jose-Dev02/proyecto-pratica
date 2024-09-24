"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServicioSchema = new mongoose_1.Schema({
    id_Trabajador: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Trabajador",
    },
    id_Maquina: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Maquina",
    },
    horario: {
        type: String,
        require: true,
    },
    cesn: {
        type: Boolean,
        default: false,
    },
    cesi: {
        type: Boolean,
        default: false,
    },
    chat_nacional: {
        type: Boolean,
        default: false,
    },
    chat_internacional: {
        type: Boolean,
        default: false,
    },
    internet_nacional: {
        type: Boolean,
        default: false,
    },
    internet: {
        type: Boolean,
        default: false,
    },
    cesn_pcc: {
        type: Boolean,
        default: false,
    },
    cesi_pcc: {
        type: Boolean,
        default: false,
    },
    chat_nacional_pcc: {
        type: Boolean,
        default: false,
    },
    chat_internacional_pcc: {
        type: Boolean,
        default: false,
    },
    internet_nacional_pcc: {
        type: Boolean,
        default: false,
    },
    internet_pcc: {
        type: Boolean,
        default: false,
    },
    asbse: {
        type: String,
    },
    assm: {
        type: String,
    },
    fecha_alta: {
        type: Date,
        default: Date.now(),
    },
    fecha_baja: {
        type: Date,
    },
});
exports.default = (0, mongoose_1.model)("Servicio", ServicioSchema);
