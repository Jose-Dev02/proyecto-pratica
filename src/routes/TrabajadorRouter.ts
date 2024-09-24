import express from "express";
import TrabajadorController from "../controllers/Trabajador_controller";

const router = express.Router();

router.post("/crear", TrabajadorController.crearTrabajador);
router.put("/actualizar/:id?", TrabajadorController.actualizarTrabajador);
router.get("/get-all", TrabajadorController.leerTrabajadors);
router.get("/get-by-id/:id", TrabajadorController.leerTrabajadorsById);
router.delete("/delete-by-id/:id", TrabajadorController.borrarTrabajador);

export default router;
