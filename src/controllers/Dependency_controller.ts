import Dependency from "../models/Dependency";

import { Request, Response } from 'express';

const crearDependency = async (req: Request, res: Response) => {

    if (!req.body.name || !req.body.direccion || !req.body.telefono) return res.status(400).json({
        status: "error",
        message: "Rellene los campos"
    })
    try {
        const response = await Dependency.findOne(req.body)
        if (response) return res.status(400).json({
            status: "error",
            error: "Dependency ya existente"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }

    const dependency = new Dependency(req.body)

    await dependency.save().catch((error: any) => {
        return res.status(500).json({
            status: "error",
            error: error.message
        })

    })

    return res.status(200).json({
        status: "success",
        messabge: `Se ha creado la dependency ${dependency.name}`
    })
}

const leerDependencys = async (_req: Request, res: Response) => {

    try {

        const response = await Dependency.find().select({ __v: 0 });

        if (response.length < 1) return res.status(404).json({
            status: "error",
            message: "No se han encontrado dependencys almacenados"
        })

        return res.status(200).json({
            status: "success",
            dependencys: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const leerDependencysById = async (req: Request, res: Response) => {

    try {

        const response = await Dependency.findOne({ _id: req.params.id }).select({ __v: 0 });

        if (!response) return res.status(404).json({
            status: "error",
            message: "No se han encontrado dependencys almacenados",
            response
        })

        return res.status(200).json({
            status: "success",
            dependencys: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const actualizarDependency = async (req: Request, res: Response) => {

    if (!!req.body) return res.status(400).json({
        status: "error",
        message: `Peticion incorrecta falta agregar un nombre para actualizar`
    })

    try {
        const old_response = await Dependency.findOne({ _id: req.params.id }).select({ __v: 0 });

        if (!old_response) return res.status(404).json({
            status: "error",
            message: "No se ha encontrado"
        })

        if (req.body.name?.toLocaleLowerCase() === old_response.name?.toLocaleLowerCase()) return res.status(400).json({
            status: "Error",
            message: `Peticion incorrecta ha agregado el mismo nombre ya existente`

        })
        const updateDependency = req.body;
        if(!updateDependency.name) delete updateDependency.name;
        if(!updateDependency.direccion) delete updateDependency.direccion;
        if(!updateDependency.telefono) delete updateDependency.telefono;

        const new_response = await Dependency.findByIdAndUpdate({ _id: req.params.id },updateDependency, { new: true });

        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado la Dependency: (${old_response}) a la nueva Dependency: (${new_response})`
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })

    }


}

const  borrarDependency = async( req: Request, res: Response)=> {

    try{
        const response = await Dependency.findByIdAndDelete({_id: req.params.id});

        if(!response) return res.status(404).json({
            status:"error",
            message: "No se ha encontrado"
        })

        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado la Dependency: ${response}`
        })

    }catch(error: any){

        return res.status(500).json({
            status:"error",
            message: error.message
        })
    }

    
}









export default {
    crearDependency,
    leerDependencys,
    leerDependencysById,
    actualizarDependency,
    borrarDependency
} 