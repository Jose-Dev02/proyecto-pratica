"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    apellido_1ro: {
        type: String,
        require: true,
    },
    apellido_2do: {
        type: String,
        require: true,
    },
    CI: {
        type: Number,
        require: true,
    },
    telefono: {
        type: String,
        require: true,
    },
    correo: {
        type: String,
        require: true,
    },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
