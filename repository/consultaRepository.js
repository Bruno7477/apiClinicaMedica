import conexao from "../database/conexao.js";

export async function criar(consulta) {
    const sql = "INSERT INTO consulta (dataHora, motivo, statusConsulta, fk_id_medico, fk_id_paciente) VALUES (?, ?, ?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [
        consulta.dataHora,
        consulta.motivo,
        consulta.statusConsulta,
        consulta.fk_id_medico,
        consulta.fk_id_paciente
    ]);
    return resultado.insertId;
}

export async function listarTodas() {
    const sql = "SELECT * FROM consulta";
    const [consultas] = await conexao.execute(sql);
    return consultas;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM consulta WHERE id_consulta = ?";
    const [consultas] = await conexao.execute(sql, [id]);
    return consultas[0];
}

export async function atualizar(id, consulta) {
    const sql = "UPDATE consulta SET dataHora = ?, motivo = ?, statusConsulta = ?, fk_id_medico = ?, fk_id_paciente = ? WHERE id_consulta = ?";
    const [resultado] = await conexao.execute(sql, [
        consulta.dataHora,
        consulta.motivo,
        consulta.statusConsulta,
        consulta.fk_id_medico,
        consulta.fk_id_paciente,
        id
    ]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = "DELETE FROM consulta WHERE id_consulta = ?";
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}