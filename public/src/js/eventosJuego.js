var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080'
    : 'https://web2tp.onrender.com';// TODO cambiar esto

import { dibujarRanking, dibujarResultados } from '../htmls/elementosHtml.js';
import { getCurrentPregunta,  hayPreguntas, incrementarCorrectas,incrementarIncorrectas,  getCorrectas, getTiempoFinalMilisegundos, getToken,promesaIntervalo, sacarIntervalo } from '../variables/juego.js';
import {dibujarCard,dibujarCard2, quitarHijoDivJuego} from './app.js';
import { main, peticionRanking} from './main2.js';


let idInterval;

const eventoBtnComenzar=()=>{
  sacarEventoBtnComenzar();
  quitarHijoDivJuego();
  dibujarCard();
  ponerEventoReiniciar();
  promesaIntervalo().then((id)=>{idInterval=id})
}

export const ponerEvento=()=>{
    
    document.getElementById("btnComenzar").addEventListener('click',eventoBtnComenzar)
    
  
}

export const sacarEventoBtnComenzar=()=>{
  document.getElementById("btnComenzar").removeEventListener('click',eventoBtnComenzar)
}


//btn-check   evento del check

export const eventoCheck=(e)=>{
    if(e.target.textContent===getCurrentPregunta().rta){
        e.target.classList.add("bg-success");
        document.getElementById("correctas").textContent=incrementarCorrectas();
    }
    
    else  {e.target.classList.add("bg-danger");
    document.getElementById("incorrectas").textContent=incrementarIncorrectas();
}

    const labels=document.getElementsByClassName("btn");
    const checks=document.getElementsByClassName("btn-check");
    

    for(let label of labels){
         label.removeEventListener('click',eventoCheck);
         
    }

    for (let check of checks){
        check.disabled=true
    } 
    const pregunta=document.getElementById("pregunta");
    pregunta.classList.add("card-header2");
    
    pregunta.innerHTML=` ${pregunta.innerHTML} 
    <p id="respuestaCorrecta"> ${getCurrentPregunta().rta}</p>`

    ponerEventoNext();
    if(!hayPreguntas()){
      sacarIntervalo(idInterval);
    }
   
}


export const ponerEventoCheck=()=>{
  const checks=document.getElementsByClassName("btn");

  for(let check of checks){
    check.addEventListener('click',eventoCheck)
  }
}



export const ponerEventoNext=()=>{
  
    const next=document.getElementById("svg");
    next.addEventListener('click',eventoNext);
  

}



const eventoNext=(e)=>{
  const pregunta=document.getElementById("pregunta");
  pregunta.classList.remove("card-header2");
  const next=document.getElementById("svg");
    next.removeEventListener('click',eventoNext);
  if(hayPreguntas()){   
      dibujarCard2()
    if(getCurrentPregunta.length===3)
       document.querySelector("img").classList.add("shadow-none", "p-3", "mb-5", "bg-body-tertiary" ,"rounded");

    }
  else{
   

      fetch(url+"/api/usuarios/ranking",{
        method : "post",
        headers:{"Content-Type":"application/json","token":getToken()},
        body:JSON.stringify({usuario:document.title,cantidad:getCorrectas(),tiempo:getTiempoFinalMilisegundos()})
    })
    .then(res=>res.json())
    .then((res)=>{
      if(res.ok){
        peticionRanking().then(()=>{
          dibujarRanking();
          document.getElementById("juego").innerHTML=`<div class="modal fade" id="miModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${res.msg}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" id="modal-body">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>`
  
  
    
        const miModal = new bootstrap.Modal(document.getElementById('miModal'));
        miModal.show();
        dibujarResultados("juego");
        });
         
      }
      dibujarResultados("juego");
    }).catch((err)=>{
      console.log(err);
    })
    
    }
   
 
    
  }

  const eventoReiniciar=()=>{
    document.getElementById("reiniciar").removeEventListener('click',eventoReiniciar)
    sacarIntervalo(idInterval).then(()=>{
     document.getElementById("juego").innerHTML="";  
     main();
    })
            
       
      
   
   }



  const ponerEventoReiniciar=()=>{
   
    document.getElementById("reiniciar").addEventListener('click',eventoReiniciar)
  }


  const eventoLogOut=()=>{
    document.getElementById("logOut").removeEventListener('click',eventoLogOut);            
    localStorage.removeItem('token');
    window.location='/login';
   }



  export const ponerEventoLogOut=()=>{
    document.getElementById("logOut").addEventListener('click',eventoLogOut)
  }