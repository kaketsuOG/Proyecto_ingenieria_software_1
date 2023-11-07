import {Request, Response} from 'express';
import { Producto } from '../models/producto';


export const getProductos = async(req: Request, res: Response) =>{  
    const listProductos = await Producto.findAll({attributes:['COD_PRODUCTO','NOMBRE_PRODUCTO','PRECIO','COD_INVENTARIO']});
    res.json(listProductos)

}
export const newProducto = async(req: Request, res: Response) =>{
    const { nombre_producto,precio,cod_inventario} =  req.body;
    try{
         await Producto.create({
            "NOMBRE_PRODUCTO": nombre_producto,
            "PRECIO":precio,
            "COD_INVENTARIO": cod_inventario
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
        const {nombre_producto,precio,cod_inventario} = req.body;
        await Producto.update({
            NOMBRE_PRODUCTO: nombre_producto,
            PRECIO: precio,
            COD_INVENTARIO: cod_inventario
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
