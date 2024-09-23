import Departamento from "../models/Departamento";

import { Request, Response } from 'express';

const crearDepartamento = async (req: Request, res: Response) => {

    if (!req.body.name || !req.body.id_dependency) return res.status(400).json({
        status: "error",
        message: "Rellene los campos"
    })
    try {
        const response = await Departamento.findOne(req.body)
        if (response) return res.status(400).json({
            status: "error",
            error: "Departamento ya existente"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }

    const departamento = new Departamento(req.body)

    await departamento.save().catch((error: any) => {
        return res.status(500).json({
            status: "error",
            error: error.message
        })

    })
    return res.status(200).json({
        status: "success",
        messae: `Se ha creado el departamento ${departamento.name}`
    })
}

const leerDepartamentos = async (_req: Request, res: Response) => {

    try {

        const response = await Departamento.find().select({ __v: 0 });

        if (response.length < 1) return res.status(404).json({
            status: "error",
            message: "No se han encontrado departamentos almacenados"
        })

        return res.status(200).json({
            status: "success",
            departamentos: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const leerDepartamentosById = async (req: Request, res: Response) => {

    try {

        const response = await Departamento.findOne({ _id: req.params.id }).select({ __v: 0 });

        if (!response) return res.status(404).json({
            status: "error",
            message: "No se han encontrado departamentos almacenados",
            response
        })

        return res.status(200).json({
            status: "success",
            departamentos: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const actualizarDepartamento = async (req: Request, res: Response) => {
    
    if (!!req.body) return res.status(400).json({
        status: "error",
        message: `Peticion incorrecta no se ha mandado ningun dato`
    })

    try {
        const old_response = await Departamento.findOne({ _id: req.params.id }).select({ _id: 0, __v: 0 });

        if (!old_response) return res.status(404).json({
            status: "error",
            message: "No se ha encontrado"
        })

        if (req.body === old_response) return res.status(400).json({
            status: "Error",
            message: `Peticion incorrecta ha agregado el mismo nombre ya existente`

        })
        const updateDepartamento = req.body;
        if(!updateDepartamento.name) delete updateDepartamento.name
        if(!updateDepartamento.id_dependency) delete updateDepartamento.id_dependency

        const new_response = await Departamento.findByIdAndUpdate({ _id: req.params.id }, updateDepartamento, { new: true })
                                               .select({ _id: 0, __v: 0 });

        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Departamento: (${old_response}) a el nuevo Departamento: (${new_response})`
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })

    }


}

const borrarDepartamento = async (req: Request, res: Response) => {

    try {
        const response = await Departamento.findByIdAndDelete({ _id: req.params.id });

        if (!response) return res.status(404).json({
            status: "error",
            message: "No se ha encontrado"
        })

        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Departamento: ${response}`
        })

    } catch (error: any) {

        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }


}




export default {
    crearDepartamento,
    leerDepartamentos,
    leerDepartamentosById,
    actualizarDepartamento,
    borrarDepartamento
} 