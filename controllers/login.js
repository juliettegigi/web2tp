//import { Express } from "express";

import { UsuarioControl } from "../db/usuarioControl.js";

export const renovarToken=async(req,res=response)=>{
 try{
  const usuario=req.usuario;
  const token=await UsuarioControl.generarJWT(usuario);
  return res.json({usuario,token})
 }
 catch(err){
    return res.json({msg:err})
 }
} 


export const loginPost=async(req, res) => {
    
  const {usuario,pass}=req.body;
  
   switch(UsuarioControl.isUsuarioYpass(usuario,pass)){
    case 1:return res.status(400).json({ msg: 'El nombre de usuario no pertenece a nuestro registro.' })
          
    case 2:  //generar el JWT
    
        try {const token=await UsuarioControl.generarJWT(usuario);
          return res.status(200).json({ok:true,
            usuario,
             token
         })
      
           }catch (error) {
             return res.status(500).json({
                 msg: 'Hable con el administrador'
             });
         } 
            
        
           
    case 3: return res.status(400).json({ msg: 'La password no coincide con el usuario.' })        
   }
  
    
}