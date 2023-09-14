import express from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { loginPost, renovarToken } from '../controllers/login.js';
import { validarBodyLoginPost, validarToken } from '../schemas/schemas.js';

 const router=express.Router();

router.post('/',[validarBodyLoginPost,loginPost])


router.get('/newT',
[  
  validarToken,
  validarJWT,
renovarToken])   

export default router;

