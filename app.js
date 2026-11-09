import express from "express";
import conexao from "./database/conexao.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";

const app = express();

app.use(express.json());
app.use("/medico", medicoRoutes);
app.use("/paciente", pacienteRoutes);
app.use("/consulta", consultaRoutes);

async function iniciarServidor() {
    try {
        await conexao.execute("SELECT 1");
        console.log("Banco de dados conectado");

        app.listen(3001, () => {
            console.log(
                "API executando em http://localhost:3001"
            );
        });
    } catch (erro) {
        console.log("Não foi possível conectar ao banco de dados");
    }
}

iniciarServidor();