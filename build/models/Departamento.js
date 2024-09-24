"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DepartamentoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    id_dependency: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Dependency",
        require: true,
    },
});
exports.default = (0, mongoose_1.model)("Departamento", DepartamentoSchema);
