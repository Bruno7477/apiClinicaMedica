export class Consulta {
    constructor(dataHora, motivo, statusConsulta, id_consulta, fk_id_medico, fk_id_paciente) {
        this.dataHora = dataHora;
        this.motivo = motivo;
        this.statusConsulta = statusConsulta;
        this.id_consulta = id_consulta;
        this.fk_id_medico = fk_id_medico;
        this.fk_id_paciente = fk_id_paciente;
    }

    validarDataHora() {
        if (!this.dataHora || isNaN(Date.parse(this.dataHora))) {
            throw new Error("A data e hora são obrigatórias e devem ser válidas.");
        }
    }

    validarMotivo() {
        if (!this.motivo || typeof this.motivo !== 'string' || this.motivo.trim().length < 5) {
            throw new Error("O motivo deve ter pelo menos 5 caracteres.");
        }
    }

    validarStatus() {
        const statusValidos = ['rascunho', 'agendada', 'concluída', 'cancelada'];
        if (!this.statusConsulta || !statusValidos.includes(this.statusConsulta.toLowerCase())) {
            throw new Error("O status deve ser rascunho, agendada, concluída ou cancelada.");
        }
    }

    validarId() {
        if (this.id_consulta !== null && this.id_consulta !== undefined) {
            const idNumerico = Number(this.id_consulta);
            if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
                throw new Error("O id_consulta deve ser um número inteiro positivo.");
            }
        }
    }
}