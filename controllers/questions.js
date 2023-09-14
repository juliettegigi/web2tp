import Juego  from "../models/juego.js"

export const preguntas10=async(req,res)=>{//TODO que en la req me manden la cantidad ded preguntas
 const juego=new Juego();
 try{await juego.init();
 return res.json({ok:true,preguntas:juego.preguntas})    }
 catch(err){
    return res.status(500).json({msg:err})
 }
}