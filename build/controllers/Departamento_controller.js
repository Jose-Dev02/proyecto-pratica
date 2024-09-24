"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Departamento_1 = __importDefault(require("../models/Departamento"));
const crearDepartamento = async (req, res) => {
    if (!req.body.name || !req.body.id_dependency)
        return res.status(400).json({
            status: "error",
            message: "Rellene los campos",
        });
    try {
        const response = await Departamento_1.default.findOne(req.body);
        if (response)
            return res.status(400).json({
                status: "error",
                error: "Departamento ya existente",
            });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
    const departamento = new Departamento_1.default(req.body);
    await departamento.save().catch((error) => {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    });
    return res.status(200).json({
        status: "success",
        message: `Se ha creado el departamento ${departamento.name}`,
    });
};
const leerDepartamentos = async (_req, res) => {
    try {
        const response = await Departamento_1.default.find().select({ __v: 0 });
        if (response.length < 1)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado departamentos almacenados",
            });
        return res.status(200).json({
            status: "success",
            departamentos: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const leerDepartamentosById = async (req, res) => {
    try {
        const response = await Departamento_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado departamentos almacenados",
                response,
            });
        return res.status(200).json({
            status: "success",
            departamentos: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const actualizarDepartamento = async (req, res) => {
    if (!!req.body)
        return res.status(400).json({
            status: "error",
            message: `Peticion incorrecta no se ha mandado ningun dato`,
        });
    try {
        const old_response = await Departamento_1.default.findOne({
            _id: req.params.id,
        }).select({ _id: 0, __v: 0 });
        if (!old_response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        if (req.body === old_response)
            return res.status(400).json({
                status: "Error",
                message: `Peticion incorrecta ha agregado el mismo nombre ya existente`,
            });
        const updateDepartamento = req.body;
        if (!updateDepartamento.name ||
            updateDepartamento.name === old_response.name)
            delete updateDepartamento.name;
        if (!updateDepartamento.id_dependency ||
            updateDepartamento.id_dependency === old_response.id_dependency)
            delete updateDepartamento.id_dependency;
        const new_response = await Departamento_1.default.findByIdAndUpdate({ _id: req.params.id }, updateDepartamento, { new: true }).select({ _id: 0, __v: 0 });
        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Departamento: (${old_response}) a el nuevo Departamento: (${new_response})`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const borrarDepartamento = async (req, res) => {
    try {
        const response = await Departamento_1.default.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Departamento: ${response.name}`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.default = {
    crearDepartamento,
    leerDepartamentos,
    leerDepartamentosById,
    actualizarDepartamento,
    borrarDepartamento,
};
