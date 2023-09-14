var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080'
    : 'https://web2tp.onrender.com';// TODO cambiar esto
const btnLogin = document.getElementById('login');
const btnSignUp = document.getElementById("signUp");
const pRtaSignUp=document.getElementById("respuestaSignUp")



btnLogin.addEventListener('click', e => {
    const usuario = document.getElementById('usuario').value;
    const pass = document.getElementById('pass').value;
   
   
    fetch(url+'/login/', {
        method: 'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({usuario,pass}),
    }).then(res => res.json())
        .then((rta)=>{
          
            if(rta.token){
              localStorage.setItem('token',rta.token)
            window.location="../htmls/juego.html"
            
            }
            
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
                if(rta.usuarioRegistrado){
                 // pRtaSignUp.innerHTML="Gracias por registrarte! Ahora puedes loguearte 👌"
                  setTimeout(()=>{
                    pRtaSignUp.innerHTML=`<p >👆</p>
                    <p class="text-success">Gracias por registrarte! Ahora puedes loguearte</p> `
                  },0)
                }
               
            })
    
           
    
    })

