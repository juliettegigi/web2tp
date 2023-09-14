import { UsuarioControl } from "../db/usuarioControl.js";

export const userGetRanking = (req, res) => {
   
    res.status(200).json({ ranking:  UsuarioControl.getRanking() })
}

export const userPut = (req, res) => {
    const token = req.header('token');
    const {id,ej}=req.params;
    const {nombre, correo}=req.body;
    res.status(200).json({id, msg: "controlador de userGet" ,token,id,nombre,correo,ej})
}

export const userPost =(req, res) => {
    
    const{usuario,pass}=req.body;
    if(UsuarioControl.insertarUsuario(usuario,pass)){
        UsuarioControl.guardarDB();
        return(res.status(200).json({ok:true,msg:"Usuario registrado"}))
    }
    else  return(res.status(400).json({msg:"Usuario ingresado ya se encuentra registrado.",usuario}))
   
}
/* export const userDelete = (req, res) => {
    const {id}=req.params;
    res.json({id, msg: "controlador de userDelete" })
}   */


export const userPostRank=(req,res)=>{
    const usuario=req.body;//{usuario,cantidad,tiempo}
   switch( UsuarioControl.insertarUsuarioRank(usuario)){
    case 0:
        return(res.json({ok:true,msg:"Felicitaciones!! ya estabas en el ranking de los 20 mejores jugadores y te has autosuperado."}))
        
    case 1:return(res.json({msg:"Estás en el ranking pero no te has superado."}))
           
    case 3:      
        return(res.json({ok:true,msg:"No has logrado entrar al ranking."}))
        
    case 2: return(res.json({ok:true,msg:"Felicitaciones!! has entrado al ranking de los 20 mejores jugadores."}))
     default: return res.json({msg:'no case'})       
                   

    }
}