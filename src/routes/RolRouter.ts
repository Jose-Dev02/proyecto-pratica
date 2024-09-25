import express from "express";
import RolController from "../controllers/Rol_controller";

const router = express.Router();

router.post("/crear", RolController.crearRol);
router.put("/actualizar/:id?", RolController.actualizarRol);
router.get("/get-all", RolController.leerRols);
router.get("/get-by-id/:id", RolController.leerRolsById);
router.get("/find/:find", RolController.finder);
router.delete("/delete-by-id/:id", RolController.borrarRol);

export default router;
