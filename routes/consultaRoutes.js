import { Router } from "express";
import {
    criarConsulta,
    listarConsultas,
    buscarConsultaPorId,
    atualizarConsulta,
    deletarConsulta,
    vincularMedico,
    removerMedico,
    vincularPaciente,
    removerPaciente
} from "../controller/consultaController.js";

const router = Router();

router.post("/", criarConsulta);
router.get("/", listarConsultas);
router.get("/:id", buscarConsultaPorId);
router.patch("/:id", atualizarConsulta);
router.delete("/:id", deletarConsulta);

router.patch("/:idConsulta/medico/:idMedico", vincularMedico);
router.patch("/:idConsulta/remover-medico", removerMedico);
router.patch("/:idConsulta/paciente/:idPaciente", vincularPaciente);
router.patch("/:idConsulta/remover-paciente", removerPaciente);

export default router;