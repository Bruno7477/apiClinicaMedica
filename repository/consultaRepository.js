import conexao from "../database/conexao.js"

export async function buscarPorId(id) {
    const sql = `
        SELECT 
            c.id_consulta,
            c.data_hora,
            c.motivo,
            c.status_consulta,
            c.fk_id_medico,
            c.fk_id_paciente,
            m.nome AS medico_nome,
            m.crm AS medico_crm,
            m.especialidade AS medico_especialidade,
            p.nome AS paciente_nome,
            p.cpf AS paciente_cpf,
            p.data_nascimento AS paciente_data_nascimento
        FROM consulta c
        LEFT JOIN medico m ON c.fk_id_medico = m.id_medico
        LEFT JOIN paciente p ON c.fk_id_paciente = p.id_paciente
        WHERE c.id_consulta = ?
    `;
    const [linhas] = await conexao.execute(sql, [id]);
    return linhas[0] || null;
}

export async function criar(consulta) {
    const sql = `INSERT INTO consulta (data_hora, motivo, status_consulta) VALUES (?, ?, ?)`;
    const [resultado] = await conexao.execute(sql, [
        consulta.dataHora,
        consulta.motivo,
        consulta.statusConsulta
    ]);
    return resultado.insertId;
}

export async function atualizar(id, consulta) {
    const sql = `
        UPDATE consulta 
        SET data_hora = ?, motivo = ?, status_consulta = ?, fk_id_medico = ?, fk_id_paciente = ?
        WHERE id_consulta = ?
    `;
    await conexao.execute(sql, [
        consulta.dataHora,
        consulta.motivo,
        consulta.statusConsulta,
        consulta.fk_id_medico,
        consulta.fk_id_paciente,
        id
    ]);
}

export async function listarTodas() {
    const sql = `SELECT * FROM consulta`;
    const [linhas] = await conexao.execute(sql);
    return linhas;
}

export async function deletar(id) {
    const sql = `DELETE FROM consulta WHERE id_consulta = ?`;
    await conexao.execute(sql, [id]);
}