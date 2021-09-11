CREATE TABLE Paciente (
CedulaP BIGSERIAL NOT NULL PRIMARY KEY,
NombreP VARCHAR (40) NOT NULL,
ApellidoP VARCHAR (100) NOT NULL
);

CREATE TABLE Funcionario (
IdFunc SERIAL NOT NULL PRIMARY KEY,
name VARCHAR (100) NOT NULL,
password VARCHAR (100) NOT NULL	
);

CREATE TABLE Repite (
id BIGSERIAL NOT NULL PRIMARY KEY,
NombreMed VARCHAR (100) NOT NULL,
Cantidad integer NOT NULL,
Hecho boolean,
Paciente_CedulaP BIGSERIAL REFERENCES Paciente (CedulaP),
Funcionario_IdFunc integer REFERENCES Funcionario (IdFunc)	
);


INSERT INTO funcionario (name,password) VALUES ('Emergencia','$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a')

INSERT INTO funcionario (name,password) VALUES ('AtencionalUsuario','$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a')

INSERT INTO funcionario (name,password) VALUES ('Policlinica','$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a')
