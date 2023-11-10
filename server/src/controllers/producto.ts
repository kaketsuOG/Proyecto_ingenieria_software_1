import {Request, Response} from 'express';
import { Producto } from '../models/producto';


export const getProductos = async(req: Request, res: Response) =>{  
    const listProductos = await Producto.findAll({attributes:['COD_PRODUCTO','NOMBRE_PRODUCTO','PRECIO_PRODUCTO','CANTIDAD_TOTAL','CANTIDAD_DISPONIBLE']});
    res.json(listProductos)

}
export const newProducto = async(req: Request, res: Response) =>{
    const { nombre_producto,precio,cantidad_total,cantidad_disponible} =  req.body;
    try{
         await Producto.create({
            "NOMBRE_PRODUCTO": nombre_producto,
            "PRECIO_PRODUCTO":precio,
            "CANTIDAD_TOTAL":cantidad_total,
            "CANTIDAD_DISPONIBLE":cantidad_disponible
        })
        return res.json({
            msg: 'Producto creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el producto',
            error
        })
    }
}
export const updateProducto = async(req: Request, res: Response) => {
    const {cod_producto} = req.params;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id del producto no existe"
        })
    }
    try{
        const {nombre_producto,precio,cantidad_total,cantidad_disponible} = req.body;
        await Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO_PRODUCTO: precio,
            CANTIDAD_TOTAL:cantidad_total,
            CANTIDAD_DISPONIBLE:cantidad_disponible
            },
            {where: {COD_PRODUCTO: cod_producto}}
        )
        return res.json({
            msg:'Producto ' + cod_producto + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el producto: '+cod_producto,
                error
            })

        }
}
export const getProducto = async(req: Request, res: Response) =>{
    const { cod_producto} =  req.params;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        })
    }
    try{

        return res.json(idProducto)

        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el producto: '+cod_producto,
                error
            })

        }
}
export const deleteProducto = async(req: Request, res: Response) =>{
    const { cod_producto} =  req.params;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto) {
        return res.status(400).json({
            msg: "El id: " + cod_producto + " de producto no existe"
        })
    }
    try{
        await Producto.destroy({where: {COD_PRODUCTO: cod_producto}}
        )
        return res.json({
            msg:'Producto de id ' + cod_producto + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el producto: '+cod_producto,
                error
            })

        }
}

export const venderProductos = async(req: Request, res: Response) =>{
    const { cod_producto} =  req.params;
    const {cantidad} = req.body;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto){
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        })
    }
    try{
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt+1; i++) {
            const cantidades = await Producto.findOne({attributes:['CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'],where: {COD_PRODUCTO: cod_producto}});
            const cantidadDisponible = cantidades?.dataValues.CANTIDAD_DISPONIBLE - 1
            if (cantidadDisponible<0){
                return res.status(400).json({
                    msg: 'No hay Stock',
                })
            }
            
            await Producto.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
                },
                {where: {COD_PRODUCTO: cod_producto}}
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

export const agregarProductos = async(req: Request, res: Response) =>{
    const { cod_producto} =  req.params;
    const {cantidad} = req.body;
    const idProducto = await Producto.findOne({where: {COD_PRODUCTO: cod_producto}})
    if (!idProducto){
        return res.status(400).json({
            msg: "El producto ingresado no existe"
        })
    }
    try{
        const cantidadInt = parseInt(cantidad, 10);
        for (let i = 1; i < cantidadInt+1; i++) {
            const cantidades = await Producto.findOne({attributes:['CANTIDAD_DISPONIBLE','CANTIDAD_TOTAL'],where: {COD_PRODUCTO: cod_producto}});
            const cantidadDisponible = cantidades?.dataValues.CANTIDAD_DISPONIBLE + 1
            const cantidadTotal = cantidades?.dataValues.CANTIDAD_TOTAL
            if (cantidadDisponible>cantidadTotal){
                return res.status(400).json({
                    msg: 'Has superado la maxima capacidad de Stock',
                })
            }
            await Producto.update({
                CANTIDAD_DISPONIBLE: cantidadDisponible
                },
                {where: {COD_PRODUCTO: cod_producto}}
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


