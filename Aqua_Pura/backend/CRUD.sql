DELIMITER //

CREATE PROCEDURE CRUD_VEHICULO(
    IN accion VARCHAR(10),
    IN codVehiculo INT,
    IN patente VARCHAR(10)
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO VEHICULO (PATENTE) VALUES (patente);
        WHEN 'READ' THEN
            SELECT * FROM VEHICULO WHERE COD_VEHICULO = codVehiculo;
        WHEN 'UPDATE' THEN
            UPDATE VEHICULO SET PATENTE = patente WHERE COD_VEHICULO = codVehiculo;
        WHEN 'DELETE' THEN
            DELETE FROM VEHICULO WHERE COD_VEHICULO = codVehiculo;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_USUARIO(
    IN accion VARCHAR(10),
    IN rutUsuario VARCHAR(10),
    IN contraseña VARCHAR(30),
    IN nombreUsuario VARCHAR(30),
    IN apellido1Usuario VARCHAR(30),
    IN apellido2Usuario VARCHAR(30),
    IN codRol INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO USUARIO (RUT_USUARIO, CONTRASEÑA, NOMBRE_USUARIO, APELLIDO1_USUARIO, APELLIDO2_USUARIO, COD_ROL)
            VALUES (rutUsuario, contraseña, nombreUsuario, apellido1Usuario, apellido2Usuario, codRol);
        WHEN 'READ' THEN
            SELECT * FROM USUARIO WHERE RUT_USUARIO = rutUsuario;
        WHEN 'UPDATE' THEN
            UPDATE USUARIO
            SET CONTRASEÑA = contraseña, NOMBRE_USUARIO = nombreUsuario, APELLIDO1_USUARIO = apellido1Usuario,
                APELLIDO2_USUARIO = apellido2Usuario, COD_ROL = codRol
            WHERE RUT_USUARIO = rutUsuario;
        WHEN 'DELETE' THEN
            DELETE FROM USUARIO WHERE RUT_USUARIO = rutUsuario;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_DETALLE_USUARIO_VEHICULO(
    IN accion VARCHAR(10),
    IN codDetalleUsuarioVehiculo INT,
    IN rutUsuario VARCHAR(10),
    IN codVehiculo INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO DETALLE_USUARIO_VEHICULO (RUT_USUARIO, COD_VEHICULO)
            VALUES (rutUsuario, codVehiculo);
        WHEN 'READ' THEN
            SELECT * FROM DETALLE_USUARIO_VEHICULO WHERE COD_USUARIO_VEHICULO = codDetalleUsuarioVehiculo;
        WHEN 'UPDATE' THEN
            UPDATE DETALLE_USUARIO_VEHICULO
            SET RUT_USUARIO = rutUsuario, COD_VEHICULO = codVehiculo
            WHERE COD_USUARIO_VEHICULO = codDetalleUsuarioVehiculo;
        WHEN 'DELETE' THEN
            DELETE FROM DETALLE_USUARIO_VEHICULO WHERE COD_USUARIO_VEHICULO = codDetalleUsuarioVehiculo;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_DISPONIBILIDAD_FECHA(
    IN accion VARCHAR(10),
    IN codDisponibilidad INT,
    IN fechaEntrega DATE,
    IN codHorarioEntrega INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO DISPONIBILIDAD_FECHA (FECHA_ENTREGA, COD_HORARIO_ENTREGA)
            VALUES (fechaEntrega, codHorarioEntrega);
        WHEN 'READ' THEN
            SELECT * FROM DISPONIBILIDAD_FECHA WHERE COD_DISPONIBILIDAD = codDisponibilidad;
        WHEN 'UPDATE' THEN
            UPDATE DISPONIBILIDAD_FECHA
            SET FECHA_ENTREGA = fechaEntrega, COD_HORARIO_ENTREGA = codHorarioEntrega
            WHERE COD_DISPONIBILIDAD = codDisponibilidad;
        WHEN 'DELETE' THEN
            DELETE FROM DISPONIBILIDAD_FECHA WHERE COD_DISPONIBILIDAD = codDisponibilidad;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_CLIENTE(
    IN accion VARCHAR(10),
    IN celularCliente INT,
    IN nombreCliente VARCHAR(30),
    IN apellido1Cliente VARCHAR(30),
    IN apellido2Cliente VARCHAR(30),
    IN direccionCliente VARCHAR(60)
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO CLIENTE (CELULAR_CLIENTE, NOMBRE_CLIENTE, APELLIDO1_CLIENTE, APELLIDO2_CLIENTE, DIRECCION_CLIENTE)
            VALUES (celularCliente, nombreCliente, apellido1Cliente, apellido2Cliente, direccionCliente);
        WHEN 'READ' THEN
            SELECT * FROM CLIENTE WHERE CELULAR_CLIENTE = celularCliente;
        WHEN 'UPDATE' THEN
            UPDATE CLIENTE
            SET NOMBRE_CLIENTE = nombreCliente, APELLIDO1_CLIENTE = apellido1Cliente,
                APELLIDO2_CLIENTE = apellido2Cliente, DIRECCION_CLIENTE = direccionCliente
            WHERE CELULAR_CLIENTE = celularCliente;
        WHEN 'DELETE' THEN
            DELETE FROM CLIENTE WHERE CELULAR_CLIENTE = celularCliente;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_CIUDAD_SUCURSAL(
    IN accion VARCHAR(10),
    IN codCiudadSucursal INT,
    IN nombreCiudad VARCHAR(100)
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO CIUDAD_SUCURSAL (COD_CIUDAD_SUCURSAL, NOMBRE_CIUDAD)
            VALUES (codCiudadSucursal, nombreCiudad);
        WHEN 'READ' THEN
            SELECT * FROM CIUDAD_SUCURSAL WHERE COD_CIUDAD_SUCURSAL = codCiudadSucursal;
        WHEN 'UPDATE' THEN
            UPDATE CIUDAD_SUCURSAL
            SET NOMBRE_CIUDAD = nombreCiudad
            WHERE COD_CIUDAD_SUCURSAL = codCiudadSucursal;
        WHEN 'DELETE' THEN
            DELETE FROM CIUDAD_SUCURSAL WHERE COD_CIUDAD_SUCURSAL = codCiudadSucursal;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_SUCURSAL(
    IN accion VARCHAR(10),
    IN codSucursal INT,
    IN nombreSucursal VARCHAR(200),
    IN calleSucursal VARCHAR(30),
    IN nroDireccionSucursal INT,
    IN codCiudadSucursal INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO SUCURSAL (COD_SUCURSAL, NOMBRE_SUCURSAL, CALLE_SUCURSAL, NRO_DIRECCION_SUCURSAL, COD_CIUDAD_SUCURSAL)
            VALUES (codSucursal, nombreSucursal, calleSucursal, nroDireccionSucursal, codCiudadSucursal);
        WHEN 'READ' THEN
            SELECT * FROM SUCURSAL WHERE COD_SUCURSAL = codSucursal;
        WHEN 'UPDATE' THEN
            UPDATE SUCURSAL
            SET NOMBRE_SUCURSAL = nombreSucursal, CALLE_SUCURSAL = calleSucursal,
                NRO_DIRECCION_SUCURSAL = nroDireccionSucursal, COD_CIUDAD_SUCURSAL = codCiudadSucursal
            WHERE COD_SUCURSAL = codSucursal;
        WHEN 'DELETE' THEN
            DELETE FROM SUCURSAL WHERE COD_SUCURSAL = codSucursal;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_INVENTARIO(
    IN accion VARCHAR(10),
    IN codInventario INT,
    IN cantidadTotal INT,
    IN cantidadDisponible INT,
    IN codSucursal INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO INVENTARIO (COD_INVENTARIO, CANTIDAD_TOTAL, CANTIDAD_DISPONIBLE, COD_SUCURSAL)
            VALUES (codInventario, cantidadTotal, cantidadDisponible, codSucursal);
        WHEN 'READ' THEN
            SELECT * FROM INVENTARIO WHERE COD_INVENTARIO = codInventario;
        WHEN 'UPDATE' THEN
            UPDATE INVENTARIO
            SET CANTIDAD_TOTAL = cantidadTotal, CANTIDAD_DISPONIBLE = cantidadDisponible, COD_SUCURSAL = codSucursal
            WHERE COD_INVENTARIO = codInventario;
        WHEN 'DELETE' THEN
            DELETE FROM INVENTARIO WHERE COD_INVENTARIO = codInventario;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_PRODUCTO(
    IN accion VARCHAR(10),
    IN codProducto INT,
    IN nombreProducto VARCHAR(30),
    IN precioProducto INT,
    IN codInventario INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO PRODUCTO (COD_PRODUCTO, NOMBRE_PRODUCTO, PRECIO_PRODUCTO, COD_INVENTARIO)
            VALUES (codProducto, nombreProducto, precioProducto, codInventario);
        WHEN 'READ' THEN
            SELECT * FROM PRODUCTO WHERE COD_PRODUCTO = codProducto;
        WHEN 'UPDATE' THEN
            UPDATE PRODUCTO
            SET NOMBRE_PRODUCTO = nombreProducto, PRECIO_PRODUCTO = precioProducto, COD_INVENTARIO = codInventario
            WHERE COD_PRODUCTO = codProducto;
        WHEN 'DELETE' THEN
            DELETE FROM PRODUCTO WHERE COD_PRODUCTO = codProducto;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_DET_ESTADO(
    IN accion VARCHAR(10),
    IN codDetEstado INT,
    IN nombreEstado VARCHAR(10)
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO DET_ESTADO (COD_DET_ESTADO, NOMBRE_ESTADO)
            VALUES (codDetEstado, nombreEstado);
        WHEN 'READ' THEN
            SELECT * FROM DET_ESTADO WHERE COD_DET_ESTADO = codDetEstado;
        WHEN 'UPDATE' THEN
            UPDATE DET_ESTADO
            SET NOMBRE_ESTADO = nombreEstado
            WHERE COD_DET_ESTADO = codDetEstado;
        WHEN 'DELETE' THEN
            DELETE FROM DET_ESTADO WHERE COD_DET_ESTADO = codDetEstado;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_HISTORIAL(
    IN accion VARCHAR(10),
    IN codHistorial INT,
    IN fechaHistorial DATE
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO HISTORIAL (COD_HISTORIAL, FECHA_HISTORIAL)
            VALUES (codHistorial, fechaHistorial);
        WHEN 'READ' THEN
            SELECT * FROM HISTORIAL WHERE COD_HISTORIAL = codHistorial;
        WHEN 'UPDATE' THEN
            UPDATE HISTORIAL
            SET FECHA_HISTORIAL = fechaHistorial
            WHERE COD_HISTORIAL = codHistorial;
        WHEN 'DELETE' THEN
            DELETE FROM HISTORIAL WHERE COD_HISTORIAL = codHistorial;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_RESERVA(
    IN accion VARCHAR(10),
    IN codReserva INT,
    IN celularCliente INT,
    IN codDisponibilidad INT,
    IN codVehiculo INT,
    IN codHistorial INT,
    IN codDetEstado INT,
    IN total INT,
    IN fechaCreacion DATE
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO RESERVA (COD_RESERVA, CELULAR_CLIENTE, COD_DISPONIBILIDAD, COD_VEHICULO, COD_HISTORIAL, COD_DET_ESTADO, TOTAL, FECHA_CREACION)
            VALUES (codReserva, celularCliente, codDisponibilidad, codVehiculo, codHistorial, codDetEstado, total, fechaCreacion);
        WHEN 'READ' THEN
            SELECT * FROM RESERVA WHERE COD_RESERVA = codReserva;
        WHEN 'UPDATE' THEN
            UPDATE RESERVA
            SET CELULAR_CLIENTE = celularCliente, COD_DISPONIBILIDAD = codDisponibilidad, COD_VEHICULO = codVehiculo,
                COD_HISTORIAL = codHistorial, COD_DET_ESTADO = codDetEstado, TOTAL = total, FECHA_CREACION = fechaCreacion
            WHERE COD_RESERVA = codReserva;
        WHEN 'DELETE' THEN
            DELETE FROM RESERVA WHERE COD_RESERVA = codReserva;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CRUD_PEDIDO(
    IN accion VARCHAR(10),
    IN codPedido INT,
    IN codProducto INT,
    IN codReserva INT
)
BEGIN
    CASE accion
        WHEN 'CREATE' THEN
            INSERT INTO PEDIDO (COD_PEDIDO, COD_PRODUCTO, COD_RESERVA)
            VALUES (codPedido, codProducto, codReserva);
        WHEN 'READ' THEN
            SELECT * FROM PEDIDO WHERE COD_PEDIDO = codPedido;
        WHEN 'UPDATE' THEN
            UPDATE PEDIDO
            SET COD_PRODUCTO = codProducto, COD_RESERVA = codReserva
            WHERE COD_PEDIDO = codPedido;
        WHEN 'DELETE' THEN
            DELETE FROM PEDIDO WHERE COD_PEDIDO = codPedido;
        ELSE
            SELECT 'Acción no válida' AS Resultado;
    END CASE;
END //

DELIMITER ;