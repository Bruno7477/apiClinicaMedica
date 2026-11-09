import conexao from "../database/conexao.js";

export async function criar(paciente) {
    const sql = "INSERT INTO paciente (nome, cpf, dataNascimento) VALUES (?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [
        paciente.nome,
        paciente.cpf,
        paciente.dataNascimento
    ]);
    return resultado.insertId;
}

export async function listarTodos() {
    const sql = "SELECT * FROM paciente";
    const [pacientes] = await conexao.execute(sql);
    return pacientes;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM paciente WHERE id_paciente = ?";
    const [pacientes] = await conexao.execute(sql, [id]);
    return pacientes[0];
}

export async function atualizar(id, paciente) {
    const sql = "UPDATE paciente SET nome = ?, cpf = ?, dataNascimento = ? WHERE id_paciente = ?";
    const [resultado] = await conexao.execute(sql, [
        paciente.nome,
        paciente.cpf,
        paciente.dataNascimento,
        id
    ]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = "DELETE FROM paciente WHERE id_paciente = ?";
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}