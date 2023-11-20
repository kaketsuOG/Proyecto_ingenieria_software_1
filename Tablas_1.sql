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

CREATE TABLE USUARIO (
    RUT_USUARIO VARCHAR(10),
    CONTRASEÑA VARCHAR(30),
    NOMBRE_USUARIO VARCHAR(30),
    APELLIDO1_USUARIO VARCHAR(30),
    APELLIDO2_USUARIO VARCHAR(30),
    COD_ROL INT,
    CONSTRAINT PK_USUARIO PRIMARY KEY(RUT_USUARIO),
    CONSTRAINT FK_USUARIO_PK_ROL_USUARIO FOREIGN KEY(COD_ROL) REFERENCES ROL_USUARIO(COD_ROL)
);

CREATE TABLE DET_HORARIO_ENTREGA(
	COD_HORARIO_ENTREGA INT AUTO_INCREMENT,
    HORA_ENTREGA TIME,
    CONSTRAINT PK_HORARIO_ENTREGA PRIMARY KEY(COD_HORARIO_ENTREGA)
);

CREATE TABLE DISPONIBILIDAD_FECHA(
    COD_DISPONIBILIDAD INT AUTO_INCREMENT,
    FECHA_ENTREGA DATE,
    COD_HORARIO_ENTREGA INT,
    CONSTRAINT PK_DISPONIBILIDAD_FECHA PRIMARY KEY (COD_DISPONIBILIDAD),
    CONSTRAINT FK_DISPONIBILIDAD_FECHA_PK_DET_HORARIO_ENTREGA FOREIGN KEY(COD_HORARIO_ENTREGA) REFERENCES DET_HORARIO_ENTREGA(COD_HORARIO_ENTREGA)
);

CREATE TABLE CLIENTE(
    CELULAR_CLIENTE INT,
    NOMBRE_CLIENTE VARCHAR(30),
    APELLIDO1_CLIENTE VARCHAR(30),
    APELLIDO2_CLIENTE VARCHAR(30),
    DIRECCION_CLIENTE VARCHAR(60),
    CONSTRAINT PK_CLIENTE PRIMARY KEY(CELULAR_CLIENTE)
);


CREATE TABLE INVENTARIO(
    COD_INVENTARIO INT,
    CANTIDAD_TOTAL INT,
    CANTIDAD_DISPONIBLE INT,
    CONSTRAINT PK_INVENTARIO PRIMARY KEY(COD_INVENTARIO)
);

CREATE TABLE PRODUCTO(
    COD_PRODUCTO INT AUTO_INCREMENT,
    NOMBRE_PRODUCTO VARCHAR(30),
    PRECIO_PRODUCTO INT,
    CANTIDAD_TOTAL INT,
    CANTIDAD_DISPONIBLE INT,
    CONSTRAINT PK_PRODUCTO PRIMARY KEY(COD_PRODUCTO),
);

CREATE TABLE HISTORIAL(
	COD_HISTORIAL INT AUTO_INCREMENT,
    FECHA_HISTORIAL DATE,
    CONSTRAINT PK_HISTORIAL PRIMARY KEY(COD_HISTORIAL)
);

CREATE TABLE RESERVA(
    COD_RESERVA INT AUTO_INCREMENT,
    CELULAR_CLIENTE INT,
    COD_DISPONIBILIDAD INT,
    PATENTE_COD_VEHICULO INT,
    COD_HISTORIAL INT,
    TOTAL INT,
    FECHA_CREACION DATE,
    CONSTRAINT PK_RESERVA PRIMARY KEY(COD_RESERVA),
    CONSTRAINT FK_RESERVA_PK_CLIENTE FOREIGN KEY(CELULAR_CLIENTE) REFERENCES CLIENTE(CELULAR_CLIENTE),
    CONSTRAINT FK_RESERVA_PK_DISPONIBILIDAD_FECHA FOREIGN KEY(COD_DISPONIBILIDAD) REFERENCES DISPONIBILIDAD_FECHA(COD_DISPONIBILIDAD),
    CONSTRAINT FK_RESERVA_PK_HISTORIAL FOREIGN KEY(COD_HISTORIAL) REFERENCES HISTORIAL(COD_HISTORIAL)
);

CREATE TABLE PEDIDO(
    COD_PEDIDO INT AUTO_INCREMENT,
    COD_PRODUCTO INT,
    COD_RESERVA INT,
    ESTADO INT,
    CONSTRAINT PK_PEDIDO PRIMARY KEY(COD_PEDIDO),
    CONSTRAINT FK_PEDIDO_PK_PRODUCTO FOREIGN KEY (COD_PRODUCTO) REFERENCES PRODUCTO(COD_PRODUCTO),
    CONSTRAINT FK_PEDIDO_PK_RESERVA FOREIGN KEY(COD_RESERVA) REFERENCES RESERVA(COD_RESERVA)
);