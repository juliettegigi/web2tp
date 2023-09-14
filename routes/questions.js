import { Router } from "express";
import { preguntas10 } from "../controllers/questions.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarToken } from "../schemas/schemas.js";


const router=Router();

router.get('/',[ 
    validarToken,
    validarJWT,
     preguntas10])


export default router;