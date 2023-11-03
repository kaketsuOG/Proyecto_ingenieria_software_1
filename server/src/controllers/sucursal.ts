import {Request, Response} from 'express';
import { Sucursal } from '../models/sucursal';
export const getSucursales = async(req: Request, res: Response) =>{  
    const listSucursal = await Sucursal.findAll();
    res.json(listSucursal)
}
export const newSucursal = async(req: Request, res: Response) =>{
    const { nombre_sucursal, cod_ciudad_sucursal,calle_sucursal,nro_direccion_sucursal} =  req.body;
    try{
         await Sucursal.create({
            "NOMBRE_SUCURSAL": nombre_sucursal,
            "COD_CIUDAD_SUCURSAL": cod_ciudad_sucursal,
            "CALLE_SUCURSAL":calle_sucursal,
            "NRO_DIRECCION_SUCURSAL":nro_direccion_sucursal
        })
        return res.json({
            msg: 'Sucursal creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear la sucursal',
            error
        })
    }
}
export const updateSucursal = async(req: Request, res: Response) => {
    const {cod_sucursal} = req.params;
    const {nombre_sucursal,cod_ciudad_sucursal,calle_sucursal,nro_direccion_sucursal} = req.body;
    const idSucursal = await Sucursal.findOne({where: {COD_SUCURSAL: cod_sucursal}})
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id de la sucursal no existe"
        })
    }
    try{
        await Sucursal.update({
            NOMBRE_SUCURSAL: nombre_sucursal,
            COD_CIUDAD_SUCURSAL: cod_ciudad_sucursal,
            CALLE_SUCURSAL: calle_sucursal,
            NRO_DIRECCION_SUCURSAL: nro_direccion_sucursal
            },
            {where: {COD_SUCURSAL: cod_sucursal}}
        )
        return res.json({
            msg:'Sucursal ' + cod_sucursal + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la sucursal: '+cod_sucursal,
                error
            })

        }
}
export const getSucursal = async(req: Request, res: Response) =>{
    const { cod_sucursal} =  req.params;
    const idSucursal = await Sucursal.findOne({where: {COD_SUCURSAL: cod_sucursal}})
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id: " + cod_sucursal + " de sucursal no existe"
        })
    }
    try{
        res.json(idSucursal)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la sucursal: '+cod_sucursal,
                error
            })

        }
}
export const deleteSucursal = async(req: Request, res: Response) =>{
    const { cod_sucursal} =  req.params;
    const idSucursal = await Sucursal.findOne({where: {COD_SUCURSAL: cod_sucursal}})
    if (!idSucursal) {
        return res.status(400).json({
            msg: "El id: " + cod_sucursal+ " de sucursal no existe"
        })
    }
    try{
        await Sucursal.destroy({where: {COD_SUCURSAL: cod_sucursal}}
        )
        return res.json({
            msg:'sucursal con id ' + cod_sucursal + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al eliminar la sucursal: '+cod_sucursal,
                error
            })

        }
}