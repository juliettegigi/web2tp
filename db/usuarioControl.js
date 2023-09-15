import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = `${currentDir}/usuario.json`;


class Usuario {
  constructor(nombre = "", pass = "") {
    this.nombre = nombre
    this.pass = pass
  }
}




const RANKING_LENGTH = 20;

export class UsuarioControl {

  static obj;

  static getRanking() {
    return this.obj.ranking;
  }
  static async init() { //cargo obj con el json

    const data = await fs.readFile(filePath, 'utf-8')

    let p = JSON.parse(data);
    UsuarioControl.obj = p;




  }
  /**
   * 
   * @param{string,string} usuarioNombre y password
   * @return{boolean} retorna true si guardó el archivo
   */
  static insertarUsuario = (usuarioNombre, pass) => {
    if (this.pertenece(usuarioNombre))
      return null;
    const usuario = new Usuario(usuarioNombre, pass);
    UsuarioControl.obj.usuariosAll[usuarioNombre] = usuario;
    return usuario;

  }
  /**
   * 
   * @param{string,string} usuarioNombre y password
   * @return{boolean} retorna 1 si "El nombre de usuario no pertenece a nuestro registro."
   * 2 si el usuario existe y coincide la pass
   * 3 el user existe, pero la pass no es correcta
   */
  static isUsuarioYpass = (usuarioNombre, pass) => {
    const usuario = this.pertenece(usuarioNombre);
    if (!usuario)
      return 1;
    if (usuario.pass === pass)
      return 2;
    return 3;
  }

  static pertenece = (usuarioNombre) => {
    let usuario;
    if (UsuarioControl.obj.hasOwnProperty("usuariosAll"))
      usuario = UsuarioControl.obj.usuariosAll[usuarioNombre]

    if (!usuario) return null;
    return usuario;

  }

  static guardarDB = async() => {

  
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(UsuarioControl.obj), 'utf-8');
      console.log('Archivo guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }

  }

  static async generarJWT(usuario) {

    return new Promise((resolve, reject) => {
      const payload = { usuario };
      jwt.sign(payload,
        process.env.SECRETORPRIVATEKEY,
        //{expiresIn:'4h'},
        (err, token) => {
          if (err)
            reject('No se pudo generar el token.')
          else resolve(token)

        })
    })
  }


  insertarUsuarioEnRank = (arr) => {

  }

  /**
   * 
   * 
   * @return{int} retorna 0 si "el user ya existía y se superó"
   * 1 si existía y no se superó
   * 2 un user nuevo que ingresa al rank
   * 3 el user no ingresa al rank
   */
  

  static insertarUsuarioRank = (user) => {

    const comparar=(a, b)=>{
      if(a.cantidad===b.cantidad && a.tiempo===b.tiempo)
        return 0;
      if(a.cantidad>b.cantidad)
         return -1
      if(a.cantidad===b.cantidad){
          if(a.tiempo<b.tiempo)
              return -1
          else return 1    
      }
      if(a.cantidad<b.cantidad)
         return 1
 }

    let userCantidad = Number(user.cantidad);
    let userTiempo = Number(user.tiempo);
    let posicionUsuarioExistente = -1;
    UsuarioControl.obj.ranking.find((elem, i) => {
      if (elem.usuario === user.usuario) {
        posicionUsuarioExistente = i;
      }
    })
   
    if(posicionUsuarioExistente!==-1){
      //userAagregar=[user,UsuarioControl.obj.ranking[posicionEnDondeInsertar]].sort(comparar)[0];
      if(UsuarioControl.obj.ranking[posicionUsuarioExistente].cantidad<userCantidad ){
         UsuarioControl.obj.ranking.splice(posicionUsuarioExistente,1)
         UsuarioControl.obj.ranking.unshift(user)
        }
      else{
        if(UsuarioControl.obj.ranking[posicionUsuarioExistente].cantidad===userCantidad ){
          if(UsuarioControl.obj.ranking[posicionUsuarioExistente].tiempo>userTiempo ){
            UsuarioControl.obj.ranking.splice(posicionUsuarioExistente,1)
            UsuarioControl.obj.ranking.unshift(user)
          }
        }
      }  
    }
    else {
      UsuarioControl.obj.ranking.unshift(user);
         
    }
    UsuarioControl.obj.ranking.sort(comparar);
    if(RANKING_LENGTH===UsuarioControl.obj.ranking.length)
      UsuarioControl.obj.ranking.pop();
    
   ( async()=>{await UsuarioControl.guardarDB()})();
  }




}

