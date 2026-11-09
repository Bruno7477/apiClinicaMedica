import { Router } from "express";
import {
    criarConsulta,
    listarConsultas,
    buscarConsultaPorId,
    atualizarConsulta,
    deletarConsulta
} from "../controller/consultaController.js";

const router = Router();

router.post("/", criarConsulta);
router.get("/", listarConsultas);
router.get("/:id", buscarConsultaPorId);
router.put("/:id", atualizarConsulta);
router.delete("/:id", deletarConsulta);

export default router;