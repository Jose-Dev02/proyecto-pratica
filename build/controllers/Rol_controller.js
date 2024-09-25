"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rol_1 = __importDefault(require("../models/Rol"));
const finder_service_1 = __importDefault(require("../services/finder_service"));
const crearRol = async (req, res) => {
    if (!req.body.name)
        return res.status(400).json({
            status: "error",
            message: "Rellene los campos",
        });
    try {
        const response = await Rol_1.default.findOne(req.body);
        if (response)
            return res.status(400).json({
                status: "error",
                error: "Rol ya existente",
            });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
    const rol = new Rol_1.default(req.body);
    await rol.save().catch((error) => {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    });
    return res.status(200).json({
        status: "success",
        message: `Se ha creado el rol ${rol.name}`,
    });
};
const leerRols = async (_req, res) => {
    try {
        const response = await Rol_1.default.find().select({ __v: 0 });
        if (response.length < 1)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado rols almacenados",
            });
        return res.status(200).json({
            status: "success",
            rols: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const leerRolsById = async (req, res) => {
    try {
        const response = await Rol_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado rols almacenados",
                response,
            });
        return res.status(200).json({
            status: "success",
            rols: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const actualizarRol = async (req, res) => {
    if (!req.body.name)
        return res.status(400).json({
            status: "error",
            message: `Peticion incorrecta falta agregar un nombre para actualizar`,
        });
    try {
        const [old_response, existingRole] = await Promise.allSettled([
            Rol_1.default.findOne({ _id: req.params.id }).select({ __v: 0 }),
            Rol_1.default.findOne({ name: req.body.name }),
        ]);
        if (old_response.status !== "fulfilled")
            throw new Error("Error old_response en BD");
        if (existingRole.status !== "fulfilled")
            throw new Error("Error existingPC en BD");
        if (!existingRole.value)
            return res.status(400).json({
                status: "error",
                message: `El Rol ${req.body.name} ya existe en la BD`,
            });
        if (!old_response.value)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        if (req.body === old_response)
            return res.status(400).json({
                status: "Error",
                message: `Peticion incorrecta ha agregado el mismo nombre ya existente`,
            });
        const new_response = await Rol_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Rol: (${old_response.value.name}) a el nuevo Rol: (${new_response?.name})`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const borrarRol = async (req, res) => {
    try {
        const response = await Rol_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Rol: ${response.name}`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const finder = async (req, res) => {
    try {
        const response = await (0, finder_service_1.default)(Rol_1.default, req.params.find);
        return res.status(200).json({
            status: "success",
            data: response,
        });
    }
    catch (Error) {
        return res.status(400).json({
            status: "error",
            error: Error.message,
        });
    }
};
exports.default = {
    crearRol,
    leerRols,
    leerRolsById,
    actualizarRol,
    borrarRol,
    finder,
};
