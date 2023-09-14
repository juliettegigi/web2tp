import { dibujarCarta } from "../htmls/elementosHtml.js";
import { ponerEventoCheck } from "./eventosJuego.js";
import { getCorrectas, getIncorrectas, getPregunta} from "../variables/juego.js";
export const App=(elementId,html)=>{


    const app=document.createElement('div');
    app.innerHTML=html;
    document.querySelector(elementId).appendChild(app)


}






export const dibujarLoading=(err)=>{
    document.getElementById("juego").innerHTML=  
    `<div class=" pt-4 d-flex  flex-column justify-content-center align-items-center bg-white">
    <div class="spinner-border" role="status ">
      <span class="visually-hidden ">Loading...</span>
    </div>
    <div class="p-4">
       <h1>${err || "Loading..."}</h1>
    </div>
  </div>`
}

export const quitarHijoDivJuego=()=>{
   document.getElementById("juego").firstChild.remove();
}


export const dibujarComenzarJuego=()=>{

  document.getElementById("juego").innerHTML=  `<div class=" pt-4 d-flex  flex-column justify-content-center align-items-center bg-white">
  <button id="btnComenzar" class="btn btn-outline-secondary">Comenzar</button>
</div>`
}

export const dibujarCard=()=>{
  document.getElementById("juego").innerHTML= dibujarCarta();
  ponerEventoCheck();

}

export const dibujarCard2=()=>{
  const pregunta2=document.getElementById("pregunta");
    pregunta2.classList.remove("card-header2");
  const {pregunta,opciones}=getPregunta();

  document.getElementById("pregunta").innerHTML= `${pregunta.length===2? `<span  class="preguntaSpan">${pregunta.join(" ")}</span>`:
  `<p class="preguntaSpan">${pregunta[0]}</p>
  <img class="card-img-top" src=${pregunta[1]}>
  <p>${pregunta[2]}</p>`
  }`
  
  document.getElementById("divOptions").innerHTML=`<input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" value=${opciones[0]}>
  <label class="btn" for="option1">${opciones[0]}</label>
  <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" value=${opciones[1]}>
  <label class="btn " for="option2">${opciones[1]}</label>
  
  <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" value=${opciones[2]}>
  <label class="btn " for="option3">${opciones[2]}</label>
  <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" value=${opciones[3]}>
  <label class="btn " for="option4">${opciones[3]}</label>  ` 

  document.getElementById("correctasIncorrectas").innerHTML=`<div id="correctas" class="col-4 footerCorrecto text-center">${getCorrectas()}</div>
  <div id="incorrectas" class="col-4 footerIncorrecto text-center">${getIncorrectas()}</div>`
  

  ponerEventoCheck();
}