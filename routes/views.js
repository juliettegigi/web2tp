import { Router } from "express";

const router= Router();



router.get('/login',(req,res)=>{
    res.render("login",{})
})

router.get('/juego',(req,res)=>{
    res.render("juego",{})
})
export default router;