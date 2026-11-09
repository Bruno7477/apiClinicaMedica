export class Medico {
    constructor(nome, crm, especialidade, id_medico) {
        if (!crm || typeof crm !== 'string' || crm.trim() === '') {
            throw new Error("O CRM é obrigatório.");
        }

        if (id_medico !== null && id_medico !== undefined) {
            const idNumerico = Number(id_medico);
            if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
                throw new Error("O id_medico deve ser um número inteiro positivo.");
            }
        }

        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
        this.id_medico = id_medico;
    }

    validarNome() {
        if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error("Nome deve ter pelo menos 3 caracteres.");
        }
    }

    validarEspecialidade() {
        if (!this.especialidade || typeof this.especialidade !== 'string' || this.especialidade.trim().length < 3) {
            throw new Error("Especialidade deve ter pelo menos 3 caracteres.");
        }
    }

    validar() {
        this.validarNome();
        this.validarEspecialidade();
    }
}