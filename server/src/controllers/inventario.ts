import { json } from "sequelize";
import { Inventario } from "../models/inventario";
import { Producto } from "../models/producto";
import {Request, Response} from 'express';
import sequelize from "sequelize";
import { Sucursal } from "../models/sucursal";


export const newInventario = async(req: Request, res: Response) =>{
    const { cod_sucursal,cantidad_total} =  req.body;
    try{
         await Inventario.create({
            "COD_SUCURSAL": cod_sucursal,
            "CANTIDAD_TOTAL":cantidad_total,
            "CANTIDAD_DISPONIBLE": cantidad_total
        })
        return res.json({
            msg: 'Inventario creado'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el inventario',
            error
        })
    }
}

export const updateInventario = async(req: Request, res: Response) => {
    const {cod_inventario} = req.params;
    const idInventario = await Producto.findOne({where: {COD_INVENTARIO: cod_inventario}})
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id del inventario no existe"
        })
    }
    try{
        const {cantidad_total} = req.body;

        await Inventario.update({
            CANTIDAD_DISPONIBLE: cantidad_total
            },
            {where: {COD_INVENTARIO: cod_inventario}}
        )
        return res.json({
            msg:'Se ha actualizado el maximo del inventario a '+ cantidad_total
         })

        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el inventario: '+cod_inventario,
                error
            })

        }
}

export const agregarProductos = async(req: Request, res: Response) =>{
    const { cod_inventario} =  req.params;
    const {cod_producto, cantidad} = req.body;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto){
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        })
    }
    const idInventario = await Inventario.findOne({where: {COD_INVENTARIO: cod_inventario}})
    if (!idInventario){
        return res.status(400).json({
            msg: "El inventario no existe"
        })
    }
    try{
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt+1; i++) {
            const cantidades = await Inventario.findOne({attributes:['CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'],where: {COD_INVENTARIO: cod_inventario}});
            const cantidadDisponible = cantidades?.dataValues.CANTIDAD_DISPONIBLE + 1
            const cantidadTotal = cantidades?.dataValues.CANTIDAD_TOTAL
            if (cantidadDisponible>cantidadTotal){
                return res.status(400).json({
                    msg: 'Has superado la maxima capacidad del inventario',
                })
            }
            await Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
                },
                {where: {COD_INVENTARIO: cod_inventario}}
            )
        }
        return res.json({
            msg: "Se han añadido "+ cantidad + " de productos"
        })


    } catch(error){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al añadir los productos',
            error

    })
}
}

export const quitarProductos = async(req: Request, res: Response) =>{
    const { cod_inventario} =  req.params;
    const {cod_producto, cantidad} = req.body;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto){
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        })
    }
    const idInventario = await Inventario.findOne({where: {COD_INVENTARIO: cod_inventario}})
    if (!idInventario){
        return res.status(400).json({
            msg: "El inventario no existe"
        })
    }
    try{
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt+1; i++) {
            const cantidades = await Inventario.findOne({attributes:['CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'],where: {COD_INVENTARIO: cod_inventario}});
            const cantidadDisponible = cantidades?.dataValues.CANTIDAD_DISPONIBLE - 1
            if (cantidadDisponible<0){
                return res.status(400).json({
                    msg: 'Inventario vacio',
                })
            }
            
            await Inventario.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
                },
                {where: {COD_INVENTARIO: cod_inventario}}
            )
        }
        return res.json({
            msg: "Se han quitado "+ cantidad + " de productos"
        })


    } catch(error){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al quitar los productos',
            error

    })
}
}

export const getInventario = async(req: Request, res: Response) =>{
    const { cod_inventario} =  req.params;
    const idInventario = await Inventario.findOne({
        attributes: [
            'COD_INVENTARIO',
            'CANTIDAD_TOTAL',
            'CANTIDAD_DISPONIBLE',
            [sequelize.col('Sucursal.NOMBRE_SUCURSAL'), 'NOMBRE_SUCURSAL']
        ],
        include: {
            model: Sucursal,
            attributes: []
        },where: {COD_INVENTARIO: cod_inventario}
    });
    if (!idInventario) {
        return res.status(400).json({
            msg: "El id: " + cod_inventario + " de inventario no existe"
        })
    }
    try{

        return res.json(idInventario)

        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el inventario: '+cod_inventario,
                error
            })

        }
}
export const getInventarios = async(req: Request, res: Response) =>{  
    const listInventarios = await Inventario.findAll({
        attributes: [
            'COD_INVENTARIO',
            'CANTIDAD_TOTAL',
            'CANTIDAD_DISPONIBLE',
            [sequelize.col('Sucursal.NOMBRE_SUCURSAL'), 'NOMBRE_SUCURSAL']
        ],
        include: {
            model: Sucursal,
            attributes:[]
        }
    });
    res.json(listInventarios)
}