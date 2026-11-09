import { Paciente } from "../model/Paciente.js";
import {
    criar as criarPacienteRepo,
    listarTodos as listarPacientesRepo,
    buscarPorId as buscarPacientePorIdRepo,
    atualizar as atualizarPacienteRepo,
    deletar as deletarPacienteRepo
} from "../repository/pacienteRepository.js";

export async function criarPaciente(req, res) {
    try {
        const { nome, cpf, dataNascimento } = req.body;

        const paciente = new Paciente(nome, cpf, dataNascimento);
        paciente.validarNome();
        paciente.validarCpf();
        paciente.validarDataNascimento();

        const idInserido = await criarPacienteRepo(paciente);

        return res.status(201).json({
            mensagem: "Paciente cadastrado com sucesso",
            id_paciente: idInserido
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function listarPacientes(req, res) {
    try {
        const pacientes = await listarPacientesRepo();
        return res.status(200).json(pacientes);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function buscarPacientePorId(req, res) {
    try {
        const id_paciente = Number(req.params.id);

        const pacienteExistente = await buscarPacientePorIdRepo(id_paciente);
        if (!pacienteExistente) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        return res.status(200).json(pacienteExistente);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function atualizarPaciente(req, res) {
    try {
        const id_paciente = Number(req.params.id);
        const { nome, cpf, dataNascimento } = req.body;

        const pacienteExistente = await buscarPacientePorIdRepo(id_paciente);
        if (!pacienteExistente) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        const paciente = new Paciente(nome, cpf, dataNascimento, id_paciente);
        paciente.validarNome();
        paciente.validarCpf();
        paciente.validarDataNascimento();
        paciente.validarId();

        await atualizarPacienteRepo(id_paciente, paciente);

        return res.status(200).json({
            mensagem: "Paciente atualizado com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function deletarPaciente(req, res) {
    try {
        const id_paciente = Number(req.params.id);

        const pacienteExistente = await buscarPacientePorIdRepo(id_paciente);
        if (!pacienteExistente) {
            return res.status(404).json({
                mensagem: "Paciente não encontrado"
            });
        }

        await deletarPacienteRepo(id_paciente);

        return res.status(200).json({
            mensagem: "Paciente removido com sucesso"
        });
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}