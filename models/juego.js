import axios from 'axios';
import { json } from 'express';

const paisesAll=[]




class Pregunta{

    constructor(name,pregunta,rta,opciones){
        this.name=name
        this.pregunta=pregunta,
        this.rta=rta,
        this.opciones=opciones//4
    }
    
    

}


export default  class Juego{

    constructor(){
        this.preguntas=[];
        this.total=0;

    }

     async init(){
        let res;
try{
        res=await axios({
            methos:'get',
            url:'https://restcountries.com/v3.1/all'
        });
        res.data.map(e=>{
            if(e.capital)
             paisesAll.push({name:e.translations.spa.common,capital:e.capital[0],flags:e.flags.png})})
      
         this.cargarLas10preguntas();  
    } catch(err){throw err}


        
    

        

    }

    getIndicePais(opciones=[],propiedad){
        let j;
        let condicion;
        if(opciones.length===0){
          condicion=(j)=> this.preguntas.some(pregunta=>{ 
            return pregunta.name===paisesAll[j].name
           })
        }
        else { condicion=(j)=>opciones.some(str=>{ 
            
            return str===paisesAll[j][`${propiedad}`]})   
        }
        do{
            j= Math.floor(Math.random()*paisesAll.length);
             
        }while(condicion(j,propiedad,opciones))
        return j;
    }

    cargarLas10preguntas=()=>{
      

  
for (let i = 0; i < 10; i++) {
    const j=this.getIndicePais() 
    if(i%2===0){
        const c=paisesAll[j].capital;
        this.preguntas.push(new Pregunta(paisesAll[j].name,[`Cuál es la ciudad capital de`, `${paisesAll[j].name}`],c,this.opciones("capital",c)))
       
    }
    else  {
        const n=paisesAll[j].name;
        this.preguntas.push(new Pregunta(paisesAll[j].name,[`La siguiente bandera`,`${paisesAll[j].flags}`,'es del país...'],n,this.opciones("name",n)))
}
}


}


mezclar=(arr=[])=>{
    for(let i=0; i<50;i++){
        const j=Math.floor(Math.random()*(arr.length));
        const p=Math.floor(Math.random()*(arr.length));
       [arr[j],arr[p]]=[arr[p],arr[j]];
    }
    
}

opciones=(propiedad,c)=>{
    const opciones=[];
    opciones.push(c);
    for(let k=1;k<4;k++)
        opciones.push(paisesAll[this.getIndicePais(opciones,propiedad)][`${propiedad}`])
    this.mezclar(opciones);
    return opciones;
}

}
