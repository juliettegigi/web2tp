import z from 'zod'
 const usuarioSchema=z.object({
    usuario:z.string({message:"Usuario tipo string."}).min(2,{message:"Nombre de usuario: mínimo 2 carácteres."}).refine((value) => !/\s/.test(value), {
        message: "El nombre de usuario no puede contener espacios en blanco.",
      }),
    pass:z.string({message:"Password tipo string."}).min(6,{message:"Pass: minimo 6 carácteres."})
})

const tokenSchema=z.object({
    token:z.string()
})

const userPostRankSchema=z.object({
    usuario:z.string({message:"Usuario tipo string."}).min(2,{message:"Nombre de usuario: mínimo 2 carácteres."}),
    cantidad:z.number({message:"Cantidad tipo number."}).int({message:"Número entero"}).lte(10,{message:"Máximo 10."}),
    tiempo:z.number()
})

const msgError=(result,res)=>{
    let str="";
    str=JSON.parse(result.error.message).map(elem=>elem.message).join(" ")
    return res.status(400).json({msg:str})
}

export const validarBodyRankPost=(req,res,next)=>{
     const result=userPostRankSchema.safeParse(req.body);
  
   
     if(result.error) msgError(result,res);  
     else next();
 }
 
export const validarBodyLoginPost=(req,res,next)=>{
   
    const result=usuarioSchema.safeParse(req.body);
 
  
    if(result.error) msgError(result,res);  
    else next();
}





export const validarToken=(req,res,next)=>{
    const result=tokenSchema.safeParse(req.headers);
  
    if(result.error) msgError(result,res);  
    else next();
}