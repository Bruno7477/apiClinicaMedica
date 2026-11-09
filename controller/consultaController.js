import { Consulta } from "../model/Consulta.js";
import {
    criar as criarConsultaRepo,
    listarTodas as listarConsultasRepo,
    buscarPorId as buscarConsultaPorIdRepo,
    atualizar as atualizarConsultaRepo,
    deletar as deletarConsultaRepo
} from "../repository/consultaRepository.js";
import { buscarPorId as buscarMedicoPorIdRepo } from "../repository/medicoRepository.js";
import { buscarPorId as buscarPacientePorIdRepo } from "../repository/pacienteRepository.js";

export async function criarConsulta(req, res) {
    try {
        const { dataHora, motivo, statusConsulta } = req.body;

        const consulta = new Consulta(dataHora, motivo, statusConsulta || "rascunho", null, null, null);
        consulta.validarDataHora();
        consulta.validarMotivo();
        consulta.validarStatus();

        const idInserido = await criarConsultaRepo(consulta);

        return res.status(201).json({
            mensagem: "Consulta cadastrada com sucesso",
            id_consulta: idInserido
        });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function listarConsultas(req, res) {
    try {
        const consultas = await listarConsultasRepo();
        return res.status(200).json(consultas);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function buscarConsultaPorId(req, res) {
    try {
        const id_consulta = Number(req.params.id);

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        return res.status(200).json(consultaExistente);
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function atualizarConsulta(req, res) {
    try {
        const id_consulta = Number(req.params.id);

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        const dataHora = req.body.dataHora !== undefined ? req.body.dataHora : consultaExistente.dataHora;
        const motivo = req.body.motivo !== undefined ? req.body.motivo : consultaExistente.motivo;
        const statusConsulta = req.body.statusConsulta !== undefined ? req.body.statusConsulta : consultaExistente.statusConsulta;

        const consulta = new Consulta(
            dataHora,
            motivo,
            statusConsulta,
            id_consulta,
            consultaExistente.fk_id_medico,
            consultaExistente.fk_id_paciente
        );

        if (req.body.dataHora !== undefined) consulta.validarDataHora();
        if (req.body.motivo !== undefined) consulta.validarMotivo();
        if (req.body.statusConsulta !== undefined) consulta.validarStatus();

        await atualizarConsultaRepo(id_consulta, consulta);

        return res.status(200).json({ mensagem: "Consulta atualizada com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function deletarConsulta(req, res) {
    try {
        const id_consulta = Number(req.params.id);

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        await deletarConsultaRepo(id_consulta);

        return res.status(200).json({ mensagem: "Consulta removida com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function vincularMedico(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);
        const idMedico = Number(req.params.idMedico);

        const consultaExistente = await buscarConsultaPorIdRepo(idConsulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        const medicoExistente = await buscarMedicoPorIdRepo(idMedico);
        if (!medicoExistente) {
            return res.status(404).json({ mensagem: "Médico não encontrado" });
        }

        consultaExistente.fk_id_medico = idMedico;
        await atualizarConsultaRepo(idConsulta, consultaExistente);

        return res.status(200).json({ mensagem: "Médico vinculado à consulta com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function removerMedico(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);

        const consultaExistente = await buscarConsultaPorIdRepo(idConsulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        consultaExistente.fk_id_medico = null;
        await atualizarConsultaRepo(idConsulta, consultaExistente);

        return res.status(200).json({ mensagem: "Vínculo com o médico removido com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function vincularPaciente(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);
        const idPaciente = Number(req.params.idPaciente);

        const consultaExistente = await buscarConsultaPorIdRepo(idConsulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        const pacienteExistente = await buscarPacientePorIdRepo(idPaciente);
        if (!pacienteExistente) {
            return res.status(404).json({ mensagem: "Paciente não encontrado" });
        }

        consultaExistente.fk_id_paciente = idPaciente;
        await atualizarConsultaRepo(idConsulta, consultaExistente);

        return res.status(200).json({ mensagem: "Paciente vinculado à consulta com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}

export async function removerPaciente(req, res) {
    try {
        const idConsulta = Number(req.params.idConsulta);

        const consultaExistente = await buscarConsultaPorIdRepo(idConsulta);
        if (!consultaExistente) {
            return res.status(404).json({ mensagem: "Consulta não encontrada" });
        }

        consultaExistente.fk_id_paciente = null;
        await atualizarConsultaRepo(idConsulta, consultaExistente);

        return res.status(200).json({ mensagem: "Vínculo com o paciente removido com sucesso" });
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }
}