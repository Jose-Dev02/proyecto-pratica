import express from "express";
import DependencyController from "../controllers/Dependency_controller";

const router = express.Router();

router.post("/crear", DependencyController.crearDependency);
router.put("/actualizar/:id?", DependencyController.actualizarDependency);
router.get("/get-all", DependencyController.leerDependencys);
router.get("/get-by-id/:id", DependencyController.leerDependencysById);
router.delete("/delete-by-id/:id", DependencyController.borrarDependency);

export default router;
