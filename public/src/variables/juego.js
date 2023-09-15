var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080'
    : 'https://web2tp.onrender.com';

export const getCronometro2 = () => {
  
  let tiempoInicial= new Date;
  let tiempo = "00:00:00:0000";
  let f = false;

  return (cb) => { 
      if (!f) {
        f = true;
        const tiempoActual=new Date;
       const diferencia=tiempoActual-tiempoInicial;
        info.tiempoFinalMilisegundos=diferencia;
      
        const horas = Math.floor(diferencia / 3600000);
        
        const minutosEnMilisegundos = diferencia % 3600000;
        const minutos = Math.floor(minutosEnMilisegundos / 60000);
        
        const segundosEnMilisegundos = minutosEnMilisegundos % 60000;
        const segundos = Math.floor(segundosEnMilisegundos / 1000);
        
        const milisegundos = segundosEnMilisegundos % 1000;
        tiempo = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}:${milisegundos.toString().padStart(3, '0')}`;
        info.cronometroTiempo=tiempo;
        cb(tiempo)
        f = false;
      }
    }
  
}



export const promesaIntervalo=()=>{return new Promise((resolved,rejected)=>{
  const f=getCronometro2();
  const id=setInterval( f,10,(tiempo)=>{
    const tiempo2= document.getElementById("tiempo")
    if(tiempo2)
       tiempo2.textContent=tiempo;

    });
     resolved(id)
})}

export const sacarIntervalo=(id)=>{return new Promise((resolved,rejected)=>{
   clearInterval(id);
   resolved()
})}




const obtenerPreguntas = async () => {

  try {
    const res = await fetch(url+'/api/questions/', {
      headers: { "Content-Type": "application/json", "token": info.token }
    })
    const res2 = await res.json();
    return [...res2.preguntas]
  }
  catch (err) {
    throw err
  }

}

const info = {

  token: "",
  currentPregunta: "",
  preguntas: [],
  cantidadPreguntasHechas: 0,
  correctas: 0,
  incorrectas: 0,
  tiempoFinalMilisegundos: 0,
  ranking: [],
  cronometroTiempo:0
}



const getTiempoFinalMilisegundos = () => {
  return info.tiempoFinalMilisegundos;
}
const getToken = () => {
  return info.token;
}
 const getPromedio = () => {

  return getTiempoFinalMilisegundos() / 10;
}

const incrementarCorrectas = () => {
  return ++info.correctas;
}
const incrementarIncorrectas = () => {
  return ++info.incorrectas;
}
const init = async () => {

  info.detenerIntervalo = false;
  info.currentPregunta = "";
  info.preguntas = [];
  info.cantidadPreguntasHechas = 0;
  info.correctas = 0;
  info.incorrectas = 0;
  info.tiempoFinalMilisegundos = 0;
  info.token = localStorage.getItem('token');
  info.preguntas = [...(await obtenerPreguntas())];
}
const getPregunta = () => {
  if (info.cantidadPreguntasHechas != info.preguntas.length) {
    info.currentPregunta = info.preguntas[info.cantidadPreguntasHechas++];
    return info.currentPregunta
  }
  return null;
}

const getCurrentPregunta = () => {
  return info.currentPregunta;
}
const hayPreguntas = () => {
  return info.cantidadPreguntasHechas !== info.preguntas.length;
}

const getCorrectas = () => {
  return info.correctas;
}
const getIncorrectas = () => {
  return info.incorrectas;
}
const getCantidadDePreguntasHechas = () => {
  return info.cantidadPreguntasHechas;
}

const getRanking = () => {
  return info.ranking;
}
const setRanking = (arr) => {
  info.ranking.length = 0;
  info.ranking.push(...arr);
}

const getTiempo=()=>{return info.cronometroTiempo}

export { init, getPregunta, getCurrentPregunta, hayPreguntas, incrementarCorrectas, incrementarIncorrectas, getCorrectas, getIncorrectas, getCantidadDePreguntasHechas, getTiempoFinalMilisegundos, getToken, getRanking, setRanking,getPromedio,getTiempo }

