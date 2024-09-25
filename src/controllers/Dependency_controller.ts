import Dependency from "../models/Dependency";

import { Request, Response } from "express";
import finder_service from "../services/finder_service";

const crearDependency = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.direccion || !req.body.telefono)
    return res.status(400).json({
      status: "error",
      message: "Rellene los campos",
    });
  try {
    const response = await Dependency.findOne({
      $or: [req.body, { telefono: req.body.telefono }],
    });
    if (response)
      return res.status(400).json({
        status: "error",
        error: "Dependency ya existente",
      });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }

  const dependency = new Dependency(req.body);

  await dependency.save().catch((error: any) => {
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

const leerDependencys = async (_req: Request, res: Response) => {
  try {
    const response = await Dependency.find().select({ __v: 0 });

    if (response.length < 1)
      return res.status(404).json({
        status: "error",
        message: "No se han encontrado dependencys almacenados",
      });

    return res.status(200).json({
      status: "success",
      dependencys: response,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const leerDependencysById = async (req: Request, res: Response) => {
  try {
    const response = await Dependency.findOne({ _id: req.params.id }).select({
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
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const actualizarDependency = async (req: Request, res: Response) => {
  if (!!req.body)
    return res.status(400).json({
      status: "error",
      message: `Peticion incorrecta falta agregar un nombre para actualizar`,
    });

  try {
    const [old_response, exist] = await Promise.allSettled([
      Dependency.findOne({ _id: req.params.id }).select({ __v: 0 }),
      Dependency.findOne({
        $or: [req.body, { telefono: req.body.telefono }],
      }),
    ]);

    if (old_response.status !== "fulfilled")
      throw new Error("Error old_response en BD");
    if (exist.status !== "fulfilled") throw new Error("Error existingPC en BD");

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
    if (
      !updateDependency.name ||
      updateDependency.name === old_response.value.name
    )
      delete updateDependency.name;
    if (
      !updateDependency.direccion ||
      updateDependency.direccion === old_response.value.direccion
    )
      delete updateDependency.direccion;
    if (
      !updateDependency.telefono ||
      updateDependency.telefono === old_response.value.telefono
    )
      delete updateDependency.telefono;

    const new_response = await Dependency.findByIdAndUpdate(
      { _id: req.params.id },
      updateDependency,
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `Se ha actualizado la Dependency: (${old_response}) a la nueva Dependency: (${new_response})`,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const borrarDependency = async (req: Request, res: Response) => {
  try {
    const response = await Dependency.findByIdAndDelete({ _id: req.params.id });

    if (!response)
      return res.status(404).json({
        status: "error",
        message: "No se ha encontrado",
      });

    return res.status(200).json({
      status: "success",
      message: `Se ha eliminado la Dependency: ${response.name}`,
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
    const response = await finder_service(Dependency, req.params.find);
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
  crearDependency,
  leerDependencys,
  leerDependencysById,
  actualizarDependency,
  borrarDependency,
  finder,
};
