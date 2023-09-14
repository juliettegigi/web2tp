
import jwt from 'jsonwebtoken';
import { UsuarioControl }  from '../db/usuarioControl.js'


export const validarJWT = async( req = request, res = response, next ) => {
  
    const token = req.header('token');

    try {
        const { usuario} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        if( !UsuarioControl.pertenece(usuario) ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

       
        
        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

}



