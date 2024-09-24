import Trabajador from "../models/Trabajador";

import { Request, Response } from "express";

const crearTrabajador = async (req: Request, res: Response) => {
  if (
    !req.body.id_Departamento ||
    !req.body.id_Rol ||
    !req.body.id_Cargo ||
    !req.body.id_usuario
  )
    return res.status(400).json({
      status: "error",
      message: "Rellene los campos",
    });
  try {
    const response = await Trabajador.findOne(req.body);
    if (response)
      return res.status(400).json({
        status: "error",
        error: "Trabajador ya existente",
      });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }

  const trabajador = new Trabajador(req.body);

  await trabajador.save().catch((error: any) => {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  });
  return res.status(200).json({
    status: "success",
    message: `Se ha creado el trabajador ${trabajador.id_usuario}`,
  });
};

const leerTrabajadors = async (_req: Request, res: Response) => {
  try {
    const response = await Trabajador.find().select({ __v: 0 });

    if (response.length < 1)
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado trabajadors almacenados",
      });

    return res.status(200).json({
      status: "success",
      trabajadors: response,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const leerTrabajadorsById = async (req: Request, res: Response) => {
  try {
    const response = await Trabajador.findOne({ _id: req.params.id }).select({
      __v: 0,
    });

    if (!response)
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado trabajadors almacenados",
        response,
      });

    return res.status(200).json({
      status: "success",
      trabajadors: response,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const actualizarTrabajador = async (req: Request, res: Response) => {
  if (!!req.body)
    return res.status(400).json({
      status: "error",
      message: `Peticion incorrecta no se han mandado datos`,
    });

  try {
    const old_response = await Trabajador.findOne({
      _id: req.params.id,
    }).select({
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
        message: `Peticion incorrecta ha agregado el mismo trabajador`,
      });

    const updateTrabajador = req.body;

    if (
      !updateTrabajador.id_Departamento ||
      updateTrabajador.id_Departamento === old_response.id_Departamento
    )
      delete updateTrabajador.id_Departamento;

    if (
      !updateTrabajador.id_Rol ||
      updateTrabajador.id_Rol === old_response.id_Rol
    )
      delete updateTrabajador.id_Rol;

    if (
      !updateTrabajador.id_Cargo ||
      updateTrabajador.id_Cargo === old_response.id_Cargo
    )
      delete updateTrabajador.id_Cargo;

    if (
      !updateTrabajador.id_usuario ||
      updateTrabajador.id_usuario === old_response.id_usuario
    )
      delete updateTrabajador.id_usuario;

    const new_response = await Trabajador.findByIdAndUpdate(
      { _id: req.params.id },
      updateTrabajador,
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `Se ha actualizado el Trabajador: (${old_response}) a el nuevo Trabajador: (${new_response})`,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const borrarTrabajador = async (req: Request, res: Response) => {
  try {
    const response = await Trabajador.findByIdAndDelete({ _id: req.params.id });

    if (!response)
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado",
      });

    return res.status(200).json({
      status: "success",
      message: `Se ha eliminado el Trabajador: ${response}`,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default {
  crearTrabajador,
  leerTrabajadors,
  leerTrabajadorsById,
  actualizarTrabajador,
  borrarTrabajador,
};
