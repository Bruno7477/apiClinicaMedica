CREATE DATABASE apiClinicaMedica;

USE apiClinicaMedica;

CREATE TABLE medico (
id_medico INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
crm VARCHAR(12) UNIQUE NOT NULL,
especialidade VARCHAR(30)
);

CREATE TABLE paciente (
id_paciente INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
cpf VARCHAR(11) UNIQUE,
data_nascimento DATE NOT NULL
);

CREATE TABLE consulta (
id_consulta INT PRIMARY KEY AUTO_INCREMENT,
data_hora DATETIME,
motivo VARCHAR(100),
status_consulta ENUM("rascunho", "agendada", "concluída","cancelada"),
fk_id_medico INT NULL,
fk_id_paciente INT NULL,

CONSTRAINT fk_consulta_medico
FOREIGN KEY (fk_id_medico) REFERENCES medico(id_medico)
ON DELETE SET NULL
ON UPDATE CASCADE,

CONSTRAINT fk_consulta_paciente
FOREIGN KEY (fk_id_paciente) REFERENCES paciente(id_paciente)
ON DELETE SET NULL
ON UPDATE CASCADE
);

