"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dependency_1 = __importDefault(require("../models/Dependency"));
const crearDependency = async (req, res) => {
    if (!req.body.name || !req.body.direccion || !req.body.telefono)
        return res.status(400).json({
            status: "error",
            message: "Rellene los campos",
        });
    try {
        const response = await Dependency_1.default.findOne({
            $or: [req.body, { telefono: req.body.telefono }],
        });
        if (response)
            return res.status(400).json({
                status: "error",
                error: "Dependency ya existente",
            });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
    const dependency = new Dependency_1.default(req.body);
    await dependency.save().catch((error) => {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    });
    return res.status(200).json({
        status: "success",
        messabge: `Se ha creado la dependency ${dependency.name}`,
    });
};
const leerDependencys = async (_req, res) => {
    try {
        const response = await Dependency_1.default.find().select({ __v: 0 });
        if (response.length < 1)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado dependencys almacenados",
            });
        return res.status(200).json({
            status: "success",
            dependencys: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const leerDependencysById = async (req, res) => {
    try {
        const response = await Dependency_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado dependencys almacenados",
                response,
            });
        return res.status(200).json({
            status: "success",
            dependencys: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const actualizarDependency = async (req, res) => {
    if (!!req.body)
        return res.status(400).json({
            status: "error",
            message: `Peticion incorrecta falta agregar un nombre para actualizar`,
        });
    try {
        const [old_response, exist] = await Promise.allSettled([
            Dependency_1.default.findOne({ _id: req.params.id }).select({ __v: 0 }),
            Dependency_1.default.findOne({
                $or: [req.body, { telefono: req.body.telefono }],
            }),
        ]);
        if (old_response.status !== "fulfilled")
            throw new Error("Error old_response en BD");
        if (exist.status !== "fulfilled")
            throw new Error("Error existingPC en BD");
        if (!old_response.value)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        if (req.body === old_response)
            return res.status(400).json({
                status: "Error",
                message: `Peticion incorrecta ha agregado la misma dependency`,
            });
        const updateDependency = req.body;
        if (!updateDependency.name ||
            updateDependency.name === old_response.value.name)
            delete updateDependency.name;
        if (!updateDependency.direccion ||
            updateDependency.direccion === old_response.value.direccion)
            delete updateDependency.direccion;
        if (!updateDependency.telefono ||
            updateDependency.telefono === old_response.value.telefono)
            delete updateDependency.telefono;
        const new_response = await Dependency_1.default.findByIdAndUpdate({ _id: req.params.id }, updateDependency, { new: true });
        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado la Dependency: (${old_response}) a la nueva Dependency: (${new_response})`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const borrarDependency = async (req, res) => {
    try {
        const response = await Dependency_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado la Dependency: ${response.name}`,
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
    crearDependency,
    leerDependencys,
    leerDependencysById,
    actualizarDependency,
    borrarDependency,
};
