import express from 'express';
import { userPost,userPostRank, userGetRanking} from '../controllers/user.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarBodyLoginPost, validarBodyRankPost } from '../schemas/schemas.js';

 const router=express.Router();

router.get('/',userGetRanking);
router.post('/',[validarBodyLoginPost,userPost]);
router.post('/ranking',[
    validarJWT,
    validarBodyRankPost,
    userPostRank])
/* router.put('/:id/:ej',userPut);
router.delete('/:id',userDelete); */


export default router;