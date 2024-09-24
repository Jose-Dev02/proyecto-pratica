import express from "express";
import UserController from "../controllers/User_controller";

const router = express.Router();

router.post("/crear", UserController.crearUser);
router.put("/actualizar/:id?", UserController.actualizarUser);
router.get("/get-all", UserController.leerUsers);
router.get("/get-by-id/:id", UserController.leerUsersById);
router.delete("/delete-by-id/:id", UserController.borrarUser);

export default router;
