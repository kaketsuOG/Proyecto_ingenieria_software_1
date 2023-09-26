DELIMITER //

-- Procedimiento para VEHICULO
CREATE PROCEDURE VEHICULO_CRUD(
    IN OPCION VARCHAR(2),
    IN COD_VEHICULO_P INT,
    IN MARCA_VEHICULO_P VARCHAR(255),
    IN PATENTE_P VARCHAR(255),
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'VEHICULO') THEN
        CREATE TABLE VEHICULO (
            COD_VEHICULO INT,
            MARCA_VEHICULO VARCHAR(255),
            PATENTE VARCHAR(255)
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO VEHICULO(COD_VEHICULO, MARCA_VEHICULO, PATENTE)
        VALUES(COD_VEHICULO_P, MARCA_VEHICULO_P, PATENTE_P);
        SET MENSAJE = 'Vehículo insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM VEHICULO;
        SET MENSAJE = 'Lectura de vehículos realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE VEHICULO SET
            MARCA_VEHICULO = MARCA_VEHICULO_P,
            PATENTE = PATENTE_P
            WHERE COD_VEHICULO = COD_VEHICULO_P;
        SET MENSAJE = 'Vehículo actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM VEHICULO WHERE COD_VEHICULO = COD_VEHICULO_P;
        SET MENSAJE = 'Vehículo eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para VEHICULO_CRUD';
    END IF;

END;
//

-- Procedimiento para USUARIO
CREATE PROCEDURE USUARIO_CRUD(
    IN OPCION VARCHAR(10),
    IN RUT_P INT,
    IN CONTRASEÑA_P VARCHAR(255),
    IN NOMBRE_USUARIO_P VARCHAR(255),
    IN APELLIDO_USUARIO_P VARCHAR(255),
    IN COD_ROL_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'USUARIO') THEN
        CREATE TABLE USUARIO (
            RUT INT,
            CONTRASEÑA VARCHAR(255),
            NOMBRE_USUARIO VARCHAR(255),
            APELLIDO_USUARIO VARCHAR(255),
            COD_ROL INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO USUARIO(CONTRASEÑA, NOMBRE_USUARIO, APELLIDO_USUARIO, COD_ROL)
        VALUES(CONTRASEÑA_P, NOMBRE_USUARIO_P, APELLIDO_USUARIO_P, COD_ROL_P);
        SET MENSAJE = 'Usuario insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM USUARIO;
        SET MENSAJE = 'Lectura de usuarios realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE USUARIO SET
            CONTRASEÑA = CONTRASEÑA_P,
            NOMBRE_USUARIO = NOMBRE_USUARIO_P,
            APELLIDO_USUARIO = APELLIDO_USUARIO_P,
            COD_ROL = COD_ROL_P
            WHERE RUT = RUT_P;
        SET MENSAJE = 'Usuario actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM USUARIO WHERE RUT = RUT_P;
        SET MENSAJE = 'Usuario eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para USUARIO_CRUD';
    END IF;

END;
//

-- Procedimiento para DETALLE_USUARIO_VEHICULO
CREATE PROCEDURE DETALLE_USUARIO_VEHICULO_CRUD(
    IN OPCION VARCHAR(2),
    IN COD_USUARIO_VEHICULO_P INT,
    IN COD_USUARIO_P INT,
    IN COD_VEHICULO_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'DETALLE_USUARIO_VEHICULO') THEN
        CREATE TABLE DETALLE_USUARIO_VEHICULO (
            COD_USUARIO_VEHICULO INT,
            COD_USUARIO INT,
            COD_VEHICULO INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO DETALLE_USUARIO_VEHICULO(COD_USUARIO, COD_VEHICULO)
        VALUES(COD_USUARIO_P, COD_VEHICULO_P);
        SET MENSAJE = 'Detalle insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM DETALLE_USUARIO_VEHICULO;
        SET MENSAJE = 'Lectura de detalles de usuario y vehículo realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE DETALLE_USUARIO_VEHICULO SET
            COD_USUARIO = COD_USUARIO_P,
            COD_VEHICULO = COD_VEHICULO_P
            WHERE COD_USUARIO_VEHICULO = COD_USUARIO_VEHICULO_P;
        SET MENSAJE = 'Detalle actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM DETALLE_USUARIO_VEHICULO WHERE COD_USUARIO_VEHICULO = COD_USUARIO_VEHICULO_P;
        SET MENSAJE = 'Detalle eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para DETALLE_USUARIO_VEHICULO_CRUD';
    END IF;

END;
//

-- Procedimiento para PRODUCTO
CREATE PROCEDURE PRODUCTO_CRUD(
    IN OPCION VARCHAR(3),
    IN COD_PRODUCTO_P INT,
    IN NOMBRE_PRODUCTO_P VARCHAR(255),
    IN PRECIO_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'PRODUCTO') THEN
        CREATE TABLE PRODUCTO (
            COD_PRODUCTO INT,
            NOMBRE_PRODUCTO VARCHAR(255),
            PRECIO INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO PRODUCTO(NOMBRE_PRODUCTO, PRECIO)
        VALUES(NOMBRE_PRODUCTO_P, PRECIO_P);
        SET MENSAJE = 'Producto insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM PRODUCTO;
        SET MENSAJE = 'Lectura de productos realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE PRODUCTO SET
            NOMBRE_PRODUCTO = NOMBRE_PRODUCTO_P,
            PRECIO = PRECIO_P
            WHERE COD_PRODUCTO = COD_PRODUCTO_P;
        SET MENSAJE = 'Producto actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM PRODUCTO WHERE COD_PRODUCTO = COD_PRODUCTO_P;
        SET MENSAJE = 'Producto eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para PRODUCTO_CRUD';
    END IF;

END;
//

-- Procedimiento para SUCURSAL
CREATE PROCEDURE SUCURSAL_CRUD(
    IN OPCION VARCHAR(1),
    IN COD_SUCURSAL_P INT,
    IN NOMBRE_SUCURSAL_P VARCHAR(255),
    IN COD_CIUDAD_SUCURSAL_P INT,
    IN CALLE_SUCURSAL_P VARCHAR(255),
    IN NRO_DIRECCION_SUCURSAL_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'SUCURSAL') THEN
        CREATE TABLE SUCURSAL (
            COD_SUCURSAL INT,
            NOMBRE_SUCURSAL VARCHAR(255),
            COD_CIUDAD_SUCURSAL INT,
            CALLE_SUCURSAL VARCHAR(255),
            NRO_DIRECCION_SUCURSAL INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO SUCURSAL(NOMBRE_SUCURSAL, COD_CIUDAD_SUCURSAL, CALLE_SUCURSAL, NRO_DIRECCION_SUCURSAL)
        VALUES(NOMBRE_SUCURSAL_P, COD_CIUDAD_SUCURSAL_P, CALLE_SUCURSAL_P, NRO_DIRECCION_SUCURSAL_P);
        SET MENSAJE = 'Sucursal insertada correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM SUCURSAL;
        SET MENSAJE = 'Lectura de sucursales realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE SUCURSAL SET
            NOMBRE_SUCURSAL = NOMBRE_SUCURSAL_P,
            COD_CIUDAD_SUCURSAL = COD_CIUDAD_SUCURSAL_P,
            CALLE_SUCURSAL = CALLE_SUCURSAL_P,
            NRO_DIRECCION_SUCURSAL = NRO_DIRECCION_SUCURSAL_P
            WHERE COD_SUCURSAL = COD_SUCURSAL_P;
        SET MENSAJE = 'Sucursal actualizada correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM SUCURSAL WHERE COD_SUCURSAL = COD_SUCURSAL_P;
        SET MENSAJE = 'Sucursal eliminada correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para SUCURSAL_CRUD';
    END IF;

END;
//

-- Procedimiento para INVENTARIO
CREATE PROCEDURE INVENTARIO_CRUD(
    IN OPCION VARCHAR(3),
    IN COD_INVENTARIO_P INT,
    IN COD_PRODUCTO_P INT,
    IN COD_SUCURSAL_P INT,
    IN CANTIDAD_TOTAL_P INT,
    IN CANTIDAD_DISPONIBLE_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'INVENTARIO') THEN
        CREATE TABLE INVENTARIO (
            COD_INVENTARIO INT,
            COD_PRODUCTO INT,
            COD_SUCURSAL INT,
            CANTIDAD_TOTAL INT,
            CANTIDAD_DISPONIBLE INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO INVENTARIO(COD_PRODUCTO, COD_SUCURSAL, CANTIDAD_TOTAL, CANTIDAD_DISPONIBLE)
        VALUES(COD_PRODUCTO_P, COD_SUCURSAL_P, CANTIDAD_TOTAL_P, CANTIDAD_DISPONIBLE_P);
        SET MENSAJE = 'Inventario insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM INVENTARIO;
        SET MENSAJE = 'Lectura de inventarios realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE INVENTARIO SET
            COD_PRODUCTO = COD_PRODUCTO_P,
            COD_SUCURSAL = COD_SUCURSAL_P,
            CANTIDAD_TOTAL = CANTIDAD_TOTAL_P,
            CANTIDAD_DISPONIBLE = CANTIDAD_DISPONIBLE_P
            WHERE COD_INVENTARIO = COD_INVENTARIO_P;
        SET MENSAJE = 'Inventario actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM INVENTARIO WHERE COD_INVENTARIO = COD_INVENTARIO_P;
        SET MENSAJE = 'Inventario eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para INVENTARIO_CRUD';
    END IF;

END;
//

-- Procedimiento para PEDIDO
CREATE PROCEDURE PEDIDO_CRUD(
    IN OPCION VARCHAR(20),
    IN COD_PEDIDO_P INT,
    IN COD_PRODUCTO_P INT,
    IN CANTIDAD_SOLICITADA_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'PEDIDO') THEN
        CREATE TABLE PEDIDO (
            COD_PEDIDO INT AUTO_INCREMENT PRIMARY KEY,
            COD_PRODUCTO INT,
            CANTIDAD_SOLICITADA INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO PEDIDO(COD_PRODUCTO, CANTIDAD_SOLICITADA)
        VALUES(COD_PRODUCTO_P, CANTIDAD_SOLICITADA_P);
        SET MENSAJE = 'Pedido insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM PEDIDO;
        SET MENSAJE = 'Lectura de pedidos realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE PEDIDO SET
            COD_PRODUCTO = COD_PRODUCTO_P,
            CANTIDAD_SOLICITADA = CANTIDAD_SOLICITADA_P
            WHERE COD_PEDIDO = COD_PEDIDO_P;
        SET MENSAJE = 'Pedido actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM PEDIDO WHERE COD_PEDIDO = COD_PEDIDO_P;
        SET MENSAJE = 'Pedido eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para PEDIDO_CRUD';
    END IF;

END;
//

-- Procedimiento para RESERVA
CREATE PROCEDURE RESERVA_CRUD(
    IN OPCION VARCHAR(20),
    IN COD_RESERVA_P INT,
    IN CELULAR_CLIENTE_P INT,
    IN COD_PEDIDO_P INT,
    IN COD_DISP_P INT,
    IN COD_VEHICULO_P INT,
    OUT ESTADO_P INT,
    OUT TOTAL_P INT,
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'RESERVA') THEN
        CREATE TABLE RESERVA (
            COD_RESERVA INT AUTO_INCREMENT PRIMARY KEY,
            CELULAR_CLIENTE INT,
            COD_PEDIDO INT,
            COD_DISP INT,
            COD_VEHICULO INT,
            ESTADO INT,
            TOTAL INT
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO RESERVA(CELULAR_CLIENTE, COD_PEDIDO, COD_DISP, COD_VEHICULO, ESTADO, TOTAL)
        VALUES(CELULAR_CLIENTE_P, COD_PEDIDO_P, COD_DISP_P, COD_VEHICULO_P, ESTADO_P, TOTAL_P);
        SET MENSAJE = 'Reserva insertada correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM RESERVA;
        SET MENSAJE = 'Lectura de reservas realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE RESERVA SET
            CELULAR_CLIENTE = CELULAR_CLIENTE_P,
            COD_PEDIDO = COD_PEDIDO_P,
            COD_DISP = COD_DISP_P,
            COD_VEHICULO = COD_VEHICULO_P,
            ESTADO = ESTADO_P,
            TOTAL = TOTAL_P
            WHERE COD_RESERVA = COD_RESERVA_P;
        SET MENSAJE = 'Reserva actualizada correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM RESERVA WHERE COD_RESERVA = COD_RESERVA_P;
        SET MENSAJE = 'Reserva eliminada correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para RESERVA_CRUD';
    END IF;

END;
//

-- Procedimiento para CLIENTE
CREATE PROCEDURE CLIENTE_CRUD(
    IN OPCION VARCHAR(100),
    IN CELULAR_CLIENTE_P INT,
    IN NOMBRE_CLIENTE_P VARCHAR(255),
    IN APELLIDO_CLIENTE_P VARCHAR(255),
    IN DIRECCION_CLIENTE_P VARCHAR(255),
    OUT MENSAJE VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'CLIENTE') THEN
        CREATE TABLE CLIENTE (
            CELULAR_CLIENTE INT PRIMARY KEY,
            NOMBRE_CLIENTE VARCHAR(255),
            APELLIDO_CLIENTE VARCHAR(255),
            DIRECCION_CLIENTE VARCHAR(255)
        );
    END IF;

    IF (OPCION = 'C') THEN
        INSERT INTO CLIENTE(CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO_CLIENTE, DIRECCION_CLIENTE)
        VALUES(CELULAR_CLIENTE_P, NOMBRE_CLIENTE_P, APELLIDO_CLIENTE_P, DIRECCION_CLIENTE_P);
        SET MENSAJE = 'Cliente insertado correctamente';
    END IF;

    IF (OPCION = 'R') THEN
        SELECT * FROM CLIENTE;
        SET MENSAJE = 'Lectura de clientes realizada correctamente';
    END IF;

    IF (OPCION = 'U') THEN
        UPDATE CLIENTE SET
            NOMBRE_CLIENTE = NOMBRE_CLIENTE_P,
            APELLIDO_CLIENTE = APELLIDO_CLIENTE_P,
            DIRECCION_CLIENTE = DIRECCION_CLIENTE_P
            WHERE CELULAR_CLIENTE = CELULAR_CLIENTE_P;
        SET MENSAJE = 'Cliente actualizado correctamente';
    END IF;

    IF (OPCION = 'D') THEN
        DELETE FROM CLIENTE WHERE CELULAR_CLIENTE = CELULAR_CLIENTE_P;
        SET MENSAJE = 'Cliente eliminado correctamente';
    END IF;

    -- Agregamos control de errores con SIGNAL SQLSTATE.
    IF (OPCION NOT IN ('C','R', 'U', 'D')) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Opción no válida para CLIENTE_CRUD';
    END IF;

END;
//

DELIMITER ;