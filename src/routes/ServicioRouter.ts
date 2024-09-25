import express from "express";
import ServicioController from "../controllers/Servicio_controller";

const router = express.Router();

router.post("/crear", ServicioController.crearServicio);
router.put("/actualizar/:id?", ServicioController.actualizarServicio);
router.get("/get-all", ServicioController.leerServicios);
router.get("/get-by-id/:id", ServicioController.leerServiciosById);
router.get("/find/:find", ServicioController.finder);
router.delete("/delete-by-id/:id", ServicioController.borrarServicio);

export default router;
