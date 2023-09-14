import { getCorrectas, getTiempo, getIncorrectas, getPregunta, getPromedio, getRanking} from "../variables/juego.js"

   
   export const dibujarCarta=()=>{//podria recibir una functio 
    const {pregunta,opciones}=getPregunta();
  
   return`<div class="card fixed-width-div" style="max-height: 100%;">
    <div id="pregunta" class="pregunta card-header col-12 ">
       ${pregunta.length===2? `<span  class="preguntaSpan">${pregunta.join(" ")}</span>`:
      `<p class="preguntaSpan">${pregunta[0]}</p>
      <img class="card-img-top" src=${pregunta[1]}>
      <p>${pregunta[2]}</p>`
      }
    </div>
    <div class="card-body">
      <div id="divOptions" class=" d-flex flex-column">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" value=${opciones[0]}>
            <label class="btn" for="option1">${opciones[0]}</label>
            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" value=${opciones[1]}>
            <label class="btn " for="option2">${opciones[1]}</label>
            
            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" value=${opciones[2]}>
            <label class="btn " for="option3">${opciones[2]}</label>
            <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" value=${opciones[3]}>
            <label class="btn " for="option4">${opciones[3]}</label>               
      </div>
    </div>
    <div class="card-footer md-auto text-center ">
        <div class="row  align-items-center">
            <div class="col-4npm">
                <p id="tiempo">⏳ 00:00:00</p>
            </div>
        </div> 
        <div class="row  align-items-center"> 
            <div class="col  d-flex justify-content-start">
                <div class="row" id="correctasIncorrectas">
                    <div id="correctas" class="col-4 footerCorrecto text-center">${getCorrectas()}</div>
                    <div id="incorrectas" class="col-4 footerIncorrecto text-center">${getIncorrectas()}</div>
                
                </div>
               
            </div>
            <div class="col-3 d-flex align-items-center justify-content-end">
               
                    <div>
                        <svg id="svg" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/></svg>
                    </div>
               
            </div>
        </div>
        
    </div>
    
    </div>`

   }

export const dibujarResultados=(id)=>{
   document.getElementById(id).innerHTML=`
    <div id="resultados" class="card" style="width: 18rem;">
  <div class="card-header">
    Resultados
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Correctas:${getCorrectas()}</li>
    <li class="list-group-item">Incorrectas:${getIncorrectas()}</li>
    <li class="list-group-item">Tiempo final:${getTiempo()}</li>
    <li class="list-group-item">Tiempo promedio por pregunta:${getPromedio()+" milisegundos"}</li>
  </ul>
</div>
    
    `
}

export const dibujarRanking=()=>{
     const filasRank=document.getElementById("filasRank");
     let i=1;
     const arrRank=getRanking();
     let filas=""
     arrRank.forEach(elem=>{
          filas+=` <tr>
          <th scope="row">${i++}</th>
          <td>${elem.usuario}</td>
          <td>${elem.cantidad}</td>
          <td>${elem.tiempo}</td>
        </tr>`
     })
     filasRank.innerHTML=filas;

}