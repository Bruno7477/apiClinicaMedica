import { Medico } from "../model/Medico.js";
import {
    criar as criarMedicoRepo,
    listarTodos as listarMedicosRepo,
    buscarPorId as buscarMedicoPorIdRepo,
    atualizar as atualizarMedicoRepo,
    deletar as deletarMedicoRepo
} from "../repository/medicoRepository.js";

export async function criarMedico(req, res) {
    try {
        const { nome, crm, especialidade } = req.body;

        const medico = new Medico(nome, crm, especialidade);
        medico.validar();

        const idInserido = await criarMedicoRepo(medico);

        return res.status(201).json({
            mensagem: "Médico cadastrado com sucesso",
            id_medico: idInserido
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function listarMedicos(req, res) {
    try {
        const medicos = await listarMedicosRepo();
        return res.status(200).json(medicos);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function buscarMedicoPorId(req, res) {
    try {
        const id_medico = Number(req.params.id);

        const medicoExistente = await buscarMedicoPorIdRepo(id_medico);
        if (!medicoExistente) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        return res.status(200).json(medicoExistente);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function atualizarMedico(req, res) {
    try {
        const id_medico = Number(req.params.id);
        const { nome, crm, especialidade } = req.body;

        const medicoExistente = await buscarMedicoPorIdRepo(id_medico);
        if (!medicoExistente) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        const medico = new Medico(nome, crm, especialidade, id_medico);
        medico.validar();

        await atualizarMedicoRepo(id_medico, medico);

        return res.status(200).json({
            mensagem: "Médico atualizado com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function deletarMedico(req, res) {
    try {
        const id_medico = Number(req.params.id);

        const medicoExistente = await buscarMedicoPorIdRepo(id_medico);
        if (!medicoExistente) {
            return res.status(404).json({
                mensagem: "Médico não encontrado"
            });
        }

        await deletarMedicoRepo(id_medico);

        return res.status(200).json({
            mensagem: "Médico removido com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}