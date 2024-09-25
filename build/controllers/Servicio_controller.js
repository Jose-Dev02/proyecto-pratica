"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Servicio_1 = __importDefault(require("../models/Servicio"));
const finder_service_1 = __importDefault(require("../services/finder_service"));
const crearServicio = async (req, res) => {
    if (!req.body.id_Trabajador || !req.body.id_Maquina || !req.body.horario)
        return res.status(400).json({
            status: "error",
            message: "Rellene los campos",
        });
    try {
        const [response, exist] = await Promise.allSettled([
            Servicio_1.default.findOne(req.body),
            Servicio_1.default.findOne({ id_Trabajador: req.body.id_Trabajador }),
        ]);
        if (response.status !== "fulfilled")
            throw new Error("Error con la response en la BD");
        if (exist.status !== "fulfilled")
            throw new Error("Error con exist en la BD");
        if (exist.value)
            return res.status(400).json({
                status: "error",
                message: "Ese trabajador esta en otro servicio ya asignado",
            });
        if (response.value)
            return res.status(400).json({
                status: "error",
                error: "Servicio ya existente",
            });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
    const servicio = new Servicio_1.default(req.body);
    await servicio.save().catch((error) => {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    });
    return res.status(200).json({
        status: "success",
        message: `Se ha creado el servicio ${servicio._id}`,
    });
};
const leerServicios = async (_req, res) => {
    try {
        const response = await Servicio_1.default.find().select({ __v: 0 });
        if (response.length < 1)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado servicios almacenados",
            });
        return res.status(200).json({
            status: "success",
            servicios: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const leerServiciosById = async (req, res) => {
    try {
        const response = await Servicio_1.default.findOne({ _id: req.params.id }).select({
            __v: 0,
        });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se han encontrado servicios almacenados",
                response,
            });
        return res.status(200).json({
            status: "success",
            servicios: response,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const actualizarServicio = async (req, res) => {
    if (!!req.body)
        return res.status(400).json({
            status: "error",
            message: `Peticion incorrecta no se han mandado datos`,
        });
    try {
        const [old_response, exist] = await Promise.allSettled([
            Servicio_1.default.findOne({ _id: req.params.id }).select({
                __v: 0,
            }),
            Servicio_1.default.findOne({ id_Trabajador: req.body.id_Trabajador }),
        ]);
        if (old_response.status !== "fulfilled")
            throw new Error("Error con la response en la BD");
        if (exist.status !== "fulfilled")
            throw new Error("Error con exist en la BD");
        if (exist.value)
            return res.status(400).json({
                status: "error",
                message: "El trabajador esta asignado a otro servicio",
            });
        if (!old_response.value)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        if (req.body === old_response.value)
            return res.status(400).json({
                status: "Error",
                message: `Peticion incorrecta ha agregado el mismo servicio`,
            });
        const new_response = await Servicio_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Servicio: (${old_response.value._id}) a el nuevo Servicio: (${new_response?.id})`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const borrarServicio = async (req, res) => {
    try {
        const response = await Servicio_1.default.findByIdAndDelete({ _id: req.params.id });
        if (!response)
            return res.status(404).json({
                status: "error",
                message: "No se ha encontrado",
            });
        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Servicio: ${response}`,
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
        const response = await (0, finder_service_1.default)(Servicio_1.default, req.params.find);
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
    crearServicio,
    leerServicios,
    leerServiciosById,
    actualizarServicio,
    borrarServicio,
    finder,
};
