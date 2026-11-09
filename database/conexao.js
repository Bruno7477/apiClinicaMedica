import mysql from "mysql2/promise";

const conexao = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "apiClinicaMedica",
    waitForConnections: true,
    connectionLimit: 10
});

export default conexao;