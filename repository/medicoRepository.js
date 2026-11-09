import conexao from "../database/conexao.js";

export async function criar(medico) {
    const sql = "INSERT INTO medico (nome, crm, especialidade) VALUES (?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [
        medico.nome,
        medico.crm,
        medico.especialidade
    ]);
    return resultado.insertId;
}

export async function listarTodos() {
    const sql = "SELECT * FROM medico";
    const [medicos] = await conexao.execute(sql);
    return medicos;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM medico WHERE id_medico = ?";
    const [medicos] = await conexao.execute(sql, [id]);
    return medicos[0];
}

export async function atualizar(id, medico) {
    const sql = "UPDATE medico SET nome = ?, crm = ?, especialidade = ? WHERE id_medico = ?";
    const [resultado] = await conexao.execute(sql, [
        medico.nome,
        medico.crm,
        medico.especialidade,
        id
    ]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = "DELETE FROM medico WHERE id_medico = ?";
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}