import express from "express";
import CargoController from "../controllers/Cargo_controller";

const router = express.Router();

router.post("/crear", CargoController.crearCargo);
router.put("/actualizar/:id?", CargoController.actualizarCargo);
router.get("/get-all", CargoController.leerCargos);
router.get("/get-by-id/:id", CargoController.leerCargosById);
router.get("/find/:find", CargoController.finder);
router.delete("/delete-by-id/:id", CargoController.borrarCargo);

export default router;
