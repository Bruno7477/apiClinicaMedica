export class Paciente {
    constructor(nome, cpf, dataNascimento, id_paciente) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.id_paciente = id_paciente;
    }

    validarNome() {
        if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error("O nome deve ter pelo menos 3 caracteres.");
        }
    }

    validarCpf() {
        if (!this.cpf || typeof this.cpf !== 'string' || !/^\d{11}$/.test(this.cpf.trim())) {
            throw new Error("O CPF deve conter exatamente 11 caracteres numéricos.");
        }
    }

    validarDataNascimento() {
        if (!this.dataNascimento || isNaN(Date.parse(this.dataNascimento))) {
            throw new Error("A data de nascimento é obrigatória e deve ser válida.");
        }
    }

    validarId() {
        if (this.id_paciente !== null && this.id_paciente !== undefined) {
            const idNumerico = Number(this.id_paciente);
            if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
                throw new Error("O id_paciente deve ser um número inteiro positivo.");
            }
        }
    }
}