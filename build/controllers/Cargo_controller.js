"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cargo_1 = __importDefault(require("../models/Cargo"));
const crearCargo = async (req, res) => {
    if (!req.body.name)
        return res.status(400).json({
            status: "error",
            message: "Rellene los campos",
        });
    try {
        const response = await Cargo_1.default.findOne(req.body);
        if (response)
            return res.status(400).json({
                status: "error",
                error: "Cargo ya existente",
            });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
    const cargo = new Cargo_1.default(req.body);
    await cargo.save().catch((error) => {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    });
    return res.status(200).json({
        status: "success",
        message: `Se ha creado el cargo ${cargo.name}`,
    });
};
const leerCargos = async (_req, res) => {
    try {
        const response = await Cargo_1.default.find().select({ __v: 0 });
        if (response.length < 1)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado cargos almacenados",
            });
        return res.status(200).json({
            status: "success",
            cargos: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const leerCargosById = async (req, res) => {
    try {
        const response = await Cargo_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado cargos almacenados",
                response,
            });
        return res.status(200).json({
            status: "success",
            cargos: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const actualizarCargo = async (req, res) => {
    if (!req.body.name)
        return res.status(400).json({
            status: "error",
            message: `Peticion incorrecta falta agregar un nombre para actualizar`,
        });
    try {
        const old_response = await Cargo_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!old_response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        if (req.body === old_response)
            return res.status(400).json({
                status: "Error",
                message: `Peticion incorrecta ha agregado el mismo cargo`,
            });
        const new_response = await Cargo_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Cargo: (${old_response.name}) a el nuevo Cargo: (${new_response?.name})`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const borrarCargo = async (req, res) => {
    try {
        const response = await Cargo_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Cargo: ${response.name}`,
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
    crearCargo,
    leerCargos,
    leerCargosById,
    actualizarCargo,
    borrarCargo,
};
