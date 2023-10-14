import {Request, Response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const newUser = async(req: Request, res: Response) =>{

    const { rut_usuario, contraseña, nombre_usuario, apellido1_usuario, apellido2_usuario, cod_rol} =  req.body;

    const usuario = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(usuario) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        })
    }

    const hashedpassword = await bcrypt.hash(contraseña, 10)
    

    try{
         await User.create({
            "RUT_USUARIO": rut_usuario,
            "CONTRASEÑA": hashedpassword,
            "NOMBRE_USUARIO":nombre_usuario,
            "APELLIDO1_USUARIO": apellido1_usuario,
            "APELLIDO2_USUARIO":apellido2_usuario,
            "COD_ROL":cod_rol
        })
        return res.json({
            msg: 'Usuario creado correctamente'
            
        })

    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}



export const getUsers = async(req: Request, res: Response) =>{
    
    const listUsers = await User.findAll({attributes:['RUT_USUARIO','NOMBRE_USUARIO']});

    res.json(listUsers)

}

export const loginUser = async(req: Request, res: Response) =>{

    const { rut_usuario, contraseña } = req.body;

    // validacion de usuario
    const usuario: any = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!usuario) {
        return res.status(400).json({
            msg: 'El rut ingresado no es valido'
        })
    }
    //validacion del password
    const passwordValida = await bcrypt.compare(contraseña, usuario.CONTRASEÑA)
    if(!passwordValida) {
        return res.status(400).json({
            msg: 'Contraseña Incorrecta'
        })
    }

    // generar token

    const token = jwt.sign({
        rut_usuario: rut_usuario
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token

    res.json({token});

}

export const getUser = async(req: Request, res: Response) =>{
    const {rut_usuario} = req.params; 
    const idUser = await User.findOne({where:{RUT_USUARIO: rut_usuario}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El rut de usuario indicado no existe"
        })
    }
    try{
        return res.json(idUser)
    }catch (error){
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })

    }
}

export const deleteUser = async(req: Request, res: Response) =>{
    const {rut_usuario} = req.params;
    const idUser = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El rut "+rut_usuario+ " de usuario no existe"
        })
    }
    try{
        await User.destroy({where: {RUT_USUARIO: rut_usuario}})
        res.json({
            msg: "Se ha eliminado al usuario: "+rut_usuario
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario con rut: "+rut_usuario,
            error
        })
    }
}

export const updateUser = async(req: Request, res: Response)=>{
    const {rut_usuario} = req.params;
    const idUser = await User.findOne({where: {RUT_USUARIO: rut_usuario}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El rut "+rut_usuario+ " de usuario no existe"
        })
    }
    try{
        const {nombre_usuario,apellido1_usuario,apellido2_usuario,contraseña,cod_rol} = req.body;
        await User.update({
            NOMBRE_USUARIO: nombre_usuario,
            APELLIDO1_USUARIO: apellido1_usuario,
            APELLIDO2_USUARIO: apellido2_usuario,
            CONTRASEÑA: contraseña,
            COD_ROL:cod_rol

        },{where: {RUT_USUARIO: rut_usuario}
    })
        res.json({
            msg: "Se ha actualizado al usuario: "+rut_usuario
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido actualizar el usuario con rut: "+rut_usuario,
            error
        })
    }
}
User.sync();