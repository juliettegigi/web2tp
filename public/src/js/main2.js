var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080'
    : 'https://web2tp.onrender.com';// TODO cambiar esto
import { dibujarLoading,dibujarComenzarJuego, quitarHijoDivJuego } from './app.js';

import { init, setRanking} from '../variables/juego.js';
import { ponerEvento, ponerEventoLogOut } from './eventosJuego.js';
import { dibujarRanking } from '../htmls/elementosHtml.js';


export const validarJWT=async()=>{
    const token = localStorage.getItem('token');

    if(!token || token.length<=10){  //si el token tiene menos de 10 letras
        window.location='index.html';//redirecciono
    }


    //tengo que llamar al endpoint me hace un nuevo token
    try {
    const token2 = localStorage.getItem('token');
        let respuesta=await fetch(url+'/login/newT',{
            headers:{"token":token2}
        })
        if(respuesta.ok){
            respuesta=await respuesta.json(); 
        const {usuario,token}=respuesta;
        localStorage.setItem('token',token);
        document.title=usuario;}
        else throw new Error(respuesta.msg)  
    } catch (error) { 
        window.location='index.html';//redirecciono
    } 
}

export const peticionRanking=async()=>{
try{
    let rta=await fetch(url+'/api/user')
    rta=await rta.json();
    setRanking(rta.ranking);
}catch(err){console.log(err);}
}



export const main=async()=>{

   while(true){//TODO:2minutos
    try
        {   
            dibujarLoading(); 
            await validarJWT();
              
         
          await init(); 
            quitarHijoDivJuego(); 
            ponerEventoLogOut();
            dibujarComenzarJuego();
            
            await peticionRanking();         
            dibujarRanking();
            ponerEvento(); 
            break;
         }
         catch(err){
           console.log(err)
          dibujarLoading(err);
         } 
   }

    }
    