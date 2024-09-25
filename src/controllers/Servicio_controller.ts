import Servicio from "../models/Servicio";

import { Request, Response } from "express";
import finder_service from "../services/finder_service";

const crearServicio = async (req: Request, res: Response) => {
  if (!req.body.id_Trabajador || !req.body.id_Maquina || !req.body.horario)
    return res.status(400).json({
      status: "error",
      message: "Rellene los campos",
    });
  try {
    const [response, exist] = await Promise.allSettled([
      Servicio.findOne(req.body),
      Servicio.findOne({ id_Trabajador: req.body.id_Trabajador }),
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
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }

  const servicio = new Servicio(req.body);

  await servicio.save().catch((error: any) => {
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

const leerServicios = async (_req: Request, res: Response) => {
  try {
    const response = await Servicio.find().select({ __v: 0 });

    if (response.length < 1)
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado servicios almacenados",
      });

    return res.status(200).json({
      status: "success",
      servicios: response,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const leerServiciosById = async (req: Request, res: Response) => {
  try {
    const response = await Servicio.findOne({ _id: req.params.id }).select({
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
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const actualizarServicio = async (req: Request, res: Response) => {
  if (!!req.body)
    return res.status(400).json({
      status: "error",
      message: `Peticion incorrecta no se han mandado datos`,
    });

  try {
    const [old_response, exist] = await Promise.allSettled([
      Servicio.findOne({ _id: req.params.id }).select({
        __v: 0,
      }),
      Servicio.findOne({ id_Trabajador: req.body.id_Trabajador }),
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

    const new_response = await Servicio.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `Se ha actualizado el Servicio: (${old_response.value._id}) a el nuevo Servicio: (${new_response?.id})`,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const borrarServicio = async (req: Request, res: Response) => {
  try {
    const response = await Servicio.findByIdAndDelete({ _id: req.params.id });

    if (!response)
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado",
      });

    return res.status(200).json({
      status: "success",
      message: `Se ha eliminado el Servicio: ${response}`,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const finder = async (req: Request, res: Response) => {
  try {
    const response = await finder_service(Servicio, req.params.find);
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (Error: any) {
    return res.status(400).json({
      status: "error",
      error: Error.message,
    });
  }
};

export default {
  crearServicio,
  leerServicios,
  leerServiciosById,
  actualizarServicio,
  borrarServicio,
  finder,
};
