import Cargo from "../models/Cargo";

import { Request, Response } from 'express';

const crearCargo = async (req: Request, res: Response) => {

    if (!req.body.name) return res.status(400).json({
        status: "error",
        message: "Rellene los campos"
    })
    try {
        const response = await Cargo.findOne(req.body)
        if (response) return res.status(400).json({
            status: "error",
            error: "Cargo ya existente"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            error: error.message
        })
    }

    const cargo = new Cargo(req.body)

    await cargo.save().catch((error: any) => {
        return res.status(500).json({
            status: "error",
            error: error.message
        })

    })
    return res.status(200).json({
        status: "success",
        message: `Se ha creado el cargo ${cargo.name}`
    })
}

const leerCargos = async (_req: Request, res: Response) => {

    try {

        const response = await Cargo.find().select({ __v: 0 });

        if (response.length < 1) return res.status(404).json({
            status: "error",
            message: "No se han encontrado cargos almacenados"
        })

        return res.status(200).json({
            status: "success",
            cargos: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const leerCargosById = async (req: Request, res: Response) => {

    try {

        const response = await Cargo.findOne({ _id: req.params.id }).select({ __v: 0 });

        if (!response) return res.status(404).json({
            status: "error",
            message: "No se han encontrado cargos almacenados",
            response
        })

        return res.status(200).json({
            status: "success",
            cargos: response
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

const actualizarCargo = async (req: Request, res: Response) => {

    if (!req.body.name) return res.status(400).json({
        status: "error",
        message: `Peticion incorrecta falta agregar un nombre para actualizar`
    })

    try {
        const old_response = await Cargo.findOne({ _id: req.params.id }).select({ __v: 0 });

        if (!old_response) return res.status(404).json({
            status: "error",
            message: "No se ha encontrado"
        })

        if (req.body === old_response) return res.status(400).json({
            status: "Error",
            message: `Peticion incorrecta ha agregado el mismo cargo`

        })

        const new_response = await Cargo.findByIdAndUpdate({ _id: req.params.id },req.body, { new: true });

        return res.status(200).json({
            status: "success",
            message: `Se ha actualizado el Cargo: (${old_response.name}) a el nuevo Cargo: (${new_response?.name})`
        })

    } catch (error: any) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })

    }


}

const  borrarCargo = async( req: Request, res: Response)=> {

    try{
        const response = await Cargo.findByIdAndDelete({_id: req.params.id});

        if(!response) return res.status(404).json({
            status:"error",
            message: "No se ha encontrado"
        })

        return res.status(200).json({
            status: "success",
            message: `Se ha eliminado el Cargo: ${response.name}`
        })

    }catch(error: any){

        return res.status(500).json({
            status:"error",
            message: error.message
        })
    }

    
}









export default {
    crearCargo,
    leerCargos,
    leerCargosById,
    actualizarCargo,
    borrarCargo
} 