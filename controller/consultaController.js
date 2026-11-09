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
        const { dataHora, motivo, statusConsulta, fk_id_medico, fk_id_paciente } = req.body;

        const consulta = new Consulta(dataHora, motivo, statusConsulta, null, fk_id_medico, fk_id_paciente);
        consulta.validarDataHora();
        consulta.validarMotivo();
        consulta.validarStatus();

        const medico = await buscarMedicoPorIdRepo(fk_id_medico);
        const paciente = await buscarPacientePorIdRepo(fk_id_paciente);

        if (!medico || !paciente) {
            return res.status(404).json({
                mensagem: "Médico ou paciente não encontrado"
            });
        }

        const idInserido = await criarConsultaRepo(consulta);

        return res.status(201).json({
            mensagem: "Consulta agendada com sucesso",
            id_consulta: idInserido
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function listarConsultas(req, res) {
    try {
        const consultas = await listarConsultasRepo();
        return res.status(200).json(consultas);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function buscarConsultaPorId(req, res) {
    try {
        const id_consulta = Number(req.params.id);

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({
                mensagem: "Consulta não encontrada"
            });
        }

        return res.status(200).json(consultaExistente);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function atualizarConsulta(req, res) {
    try {
        const id_consulta = Number(req.params.id);
        const { dataHora, motivo, statusConsulta, fk_id_medico, fk_id_paciente } = req.body;

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({
                mensagem: "Consulta não encontrada"
            });
        }

        const consulta = new Consulta(dataHora, motivo, statusConsulta, id_consulta, fk_id_medico, fk_id_paciente);
        consulta.validarDataHora();
        consulta.validarMotivo();
        consulta.validarStatus();
        consulta.validarId();

        const medico = await buscarMedicoPorIdRepo(fk_id_medico);
        const paciente = await buscarPacientePorIdRepo(fk_id_paciente);

        if (!medico || !paciente) {
            return res.status(404).json({
                mensagem: "Médico ou paciente não encontrado"
            });
        }

        await atualizarConsultaRepo(id_consulta, consulta);

        return res.status(200).json({
            mensagem: "Consulta atualizada com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function deletarConsulta(req, res) {
    try {
        const id_consulta = Number(req.params.id);

        const consultaExistente = await buscarConsultaPorIdRepo(id_consulta);
        if (!consultaExistente) {
            return res.status(404).json({
                mensagem: "Consulta não encontrada"
            });
        }

        await deletarConsultaRepo(id_consulta);

        return res.status(200).json({
            mensagem: "Consulta removida com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}