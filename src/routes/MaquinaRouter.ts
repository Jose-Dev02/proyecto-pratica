import express from "express";
import MaquinaController from "../controllers/Maquina_controller";

const router = express.Router();

router.post("/crear", MaquinaController.crearMaquina);
router.put("/actualizar/:id?", MaquinaController.actualizarMaquina);
router.get("/get-all", MaquinaController.leerMaquinas);
router.get("/get-by-id/:id", MaquinaController.leerMaquinasById);
router.get("/find/:find", MaquinaController.finder);
router.delete("/delete-by-id/:id", MaquinaController.borrarMaquina);

export default router;
