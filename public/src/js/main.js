
import {App} from './app.js';
import formSignIn from '../htmls/formSignIn.js'
App('#app',formSignIn);

const btnLogin = document.getElementById('login');
const btnSignUp = document.getElementById("signUp");
const pRtaSignUp=document.getElementById("respuestaSignUp")

var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080'
    : 'https://web2tp.onrender.com';

btnLogin.addEventListener('click', e => {
    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('pass').value;
    if (pass.length<6){
        pRtaSignUp.classList.remove('col');
        pRtaSignUp.classList.add('col-12');
        pRtaSignUp.innerHTML=`<p >👆</p>
        <p class="text-success">Password incorrecta</p> `
        return
    }
   
   
    fetch(url+"/login", {
        method: 'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({usuario,pass}),
    }).then(res => res.json())
        .then((rta)=>{
           if(rta.ok){ 
            if(rta.token){
              localStorage.setItem('token',rta.token)
            window.location="/juego"
            }}
            else{
                pRtaSignUp.classList.remove('col');
                pRtaSignUp.classList.add('col-12');
                pRtaSignUp.innerHTML=`<p >👆</p>
                <p class="text-success">${rta.msg}</p> `
            }
            
        })
        .catch(err=>{
            console.log(err);
         })  
    


})


btnSignUp.addEventListener('click', e => {
        const usuario = document.getElementById('usuario').value;
        const pass = document.getElementById('pass').value;
       
       
        fetch(url+'/api/usuarios/', {
            method: 'post',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({usuario,pass}),
        }).then(res => res.json())
            .then((rta)=>{
                if(rta.ok){
                    pRtaSignUp.classList.remove('col-12');
                    pRtaSignUp.classList.add('col');
                    pRtaSignUp.innerHTML=`<p >👆</p>
                    <p class="text-success">Gracias por registrarte! Ahora puedes loguearte</p> `
                  
                }
                else{
                    pRtaSignUp.classList.remove('col');
                    pRtaSignUp.classList.add('col-12');
                pRtaSignUp.innerHTML=`<p >👆</p>
                <p class="text-success">${rta.msg}</p> `
                }
               
            })
    
         .catch(err=>{
            console.log(err);
         })  
    
    })

