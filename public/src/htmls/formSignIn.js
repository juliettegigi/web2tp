const html=`<div class="row justify-content-md-center py-4">
    <div  class="col-lg-4 col-md-6 col-sm-12">
        <main class="form-signin w-100 m-auto">
          <div class="d-grid">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        
            <div class="form-floating py-2">
              <input type="email" class="form-control" id="usuario" placeholder="usuario">
              <label for="usuario">Nombre de usuario</label>
            </div>
            <div class="form-floating py-2">
              <input type="password" class="form-control" id="pass" placeholder="Password">
              <label for="pass">Password</label>
            </div>
        
        
            <div class="container">
                <div class="row row-cols-2">
                    <div class="col">
                        <button class="col btn btn-primary w-100 py-2" type="button" id="signUp">Sign up</button>
                        
                    </div>
                    <div class="col">
                        <button class="btn btn-primary w-100 py-2" type="button" id="login">Login</button>
                        
                    </div>
                </div>
            </div>

            
          </div>
          <div class="constainer py-4 text-center" >
            <div class="row row-cols-2">
              <div class="col"></div>
              <div class="col text-center" id="respuestaSignUp">
                
              </div>
            </div>
          </div>
        </main>
    </div>
</div>`


export default html;