import { Router } from "express";
import {
    criarMedico,
    listarMedicos,
    buscarMedicoPorId,
    atualizarMedico,
    deletarMedico
} from "../controller/medicoController.js";

const router = Router();

router.post("/", criarMedico);
router.get("/", listarMedicos);
router.get("/:id", buscarMedicoPorId);
router.patch("/:id", atualizarMedico);
router.delete("/:id", deletarMedico);

export default router;