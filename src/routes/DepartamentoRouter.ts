import express from "express";
import DepartamentoController from '../controllers/Departamento_controller';

const router = express.Router();

router.post('/crear', DepartamentoController.crearDepartamento);
router.put('/actualizar/:id?', DepartamentoController.actualizarDepartamento);
router.get('/get-all', DepartamentoController.leerDepartamentos);
router.get('/get-by-id/:id', DepartamentoController.leerDepartamentosById);
router.delete('/delete-by-id/:id', DepartamentoController.borrarDepartamento);




export default router;