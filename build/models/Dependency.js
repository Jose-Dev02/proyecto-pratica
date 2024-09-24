"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DependencySchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    direccion: {
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true,
    },
});
exports.default = (0, mongoose_1.model)("Dependency", DependencySchema);
