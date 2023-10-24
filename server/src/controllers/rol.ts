import {Request, Response} from 'express';
import { Rol } from '../models/rol';
export const getRol = async(req: Request, res: Response) =>{  
    const listRol = await Rol.findAll({attributes:['COD_ROL','NOMBRE_ROL']});
    res.json(listRol)
}
export const newRol = async(req: Request, res: Response) =>{
    const { cod_rol, nombre_rol} =  req.body;
    const idRol = await Rol.findOne({where: {COD_ROL: cod_rol}})
    if(idRol) {
        return res.status(400).json({
            msg: 'Ya existe un Rol con ese ID'
        })
    }
    try{
         await Rol.create({
            "COD_ROL": cod_rol,
            "NOMBRE_ROL": nombre_rol
        })
        return res.json({
            msg: 'Rol creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el rol',
            error
        })
    }
}
export const updateRol = async(req: Request, res: Response) => {
    const {cod_rol} = req.params;
    const {nombre_rol} = req.body;
    const idRol = await Rol.findOne({where: {COD_ROL: cod_rol}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id del rol no existe"
        })
    }
    try{
        await Rol.update({
            NOMBRE_ROL: nombre_rol
            },
            {where: {COD_ROL: cod_rol}}
        )
        return res.json({
            msg:'Usuario ' + cod_rol + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+cod_rol,
                error
            })

        }
}
export const getOneRol = async(req: Request, res: Response) =>{
    const { cod_rol} =  req.params;
    console.log(cod_rol)
    const idRol = await Rol.findOne({where: {COD_ROL: cod_rol}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + cod_rol + " de rol no existe"
        })
    }
    try{

        const rolOne = await Rol.findOne({where: {COD_ROL: cod_rol}})
        res.json(rolOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el roll: '+cod_rol,
                error
            })

        }
}
export const deleteRol = async(req: Request, res: Response) =>{
    const { cod_rol} =  req.params;
    const idRol = await Rol.findOne({where: {COD_ROL: cod_rol}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + cod_rol + " del rol no existee"
        })
    }
    try{
        await Rol.destroy({where: {COD_ROL: cod_rol}}
        )
        return res.json({
            msg:'Rol de ' + cod_rol + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+cod_rol,
                error
            })

        }
}