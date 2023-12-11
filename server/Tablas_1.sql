CREATE TABLE VEHICULO (
    PATENTE_COD_VEHICULO VARCHAR(20),
    MARCA VARCHAR(20),
    MODELO VARCHAR(20),
    COLOR VARCHAR(30),
    ANO INT,
    CONSTRAINT PK_VEHICULO PRIMARY KEY(PATENTE_COD_VEHICULO)
);


CREATE TABLE ROL_USUARIO (
    COD_ROL INT AUTO_INCREMENT,
    NOMBRE_ROL VARCHAR(30),
    CONSTRAINT PK_ROL_USUARIO PRIMARY KEY(COD_ROL)
);

CREATE TABLE USUARIOS (
    RUT_USUARIO VARCHAR(10),
    CONTRASEÑA VARCHAR(30),
    NOMBRE_USUARIO VARCHAR(30),
    APELLIDO1_USUARIO VARCHAR(30),
    APELLIDO2_USUARIO VARCHAR(30),
    COD_ROL INT,
    CONSTRAINT PK_USUARIO PRIMARY KEY(RUT_USUARIO),
    CONSTRAINT FK_USUARIO_PK_ROL_USUARIO FOREIGN KEY(COD_ROL) REFERENCES ROL_USUARIO(COD_ROL)
);

CREATE TABLE PRODUCTO(
    COD_PRODUCTO INT AUTO_INCREMENT,
    NOMBRE_PRODUCTO VARCHAR(30),
	IMAGEN_PRODUCTO VARCHAR(100),
    PRECIO_PRODUCTO INT,
    CANTIDAD_TOTAL INT,
    CANTIDAD_DISPONIBLE INT,
    IMAGEN VARCHAR(255),
    CONSTRAINT PK_PRODUCTO PRIMARY KEY(COD_PRODUCTO)
);


CREATE TABLE RESERVA(
	COD_RESERVA INT AUTO_INCREMENT,
	FECHA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	ESTADO VARCHAR(20) DEFAULT 'Pendiente',
	TOTAL INT,
	CELULAR_CLIENTE VARCHAR(15),
	NOMBRE_CLIENTE VARCHAR(255),
	APELLIDO_CLIENTE VARCHAR(255),
	DIRECCION_CLIENTE VARCHAR(255),
	CIUDAD_CLIENTE VARCHAR(255),
    	CONSTRAINT PK_RESERVA PRIMARY KEY(COD_RESERVA)
);

CREATE TABLE DETALLE_RESERVA (
    COD_DETALLE_RESERVA INT AUTO_INCREMENT,
    COD_RESERVA INT,
    COD_PRODUCTO INT,
    CANTIDAD INT,
    SUBTOTAL INT,
    CONSTRAINT PK_DETALLE_RESERVA PRIMARY KEY(COD_DETALLE_RESERVA),
    CONSTRAINT FK_RESERVA_PK_RESERVA FOREIGN KEY (COD_RESERVA) REFERENCES RESERVA(COD_RESERVA),
    CONSTRAINT FK_RESERVA_PK_PRODUCTO FOREIGN KEY (COD_PRODUCTO) REFERENCES PRODUCTO(COD_PRODUCTO)
);