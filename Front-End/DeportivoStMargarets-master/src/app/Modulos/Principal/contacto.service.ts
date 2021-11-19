import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  //url = 'http://localhost:80/PHP_BDD/';
  url = url.url;

  constructor(private http: HttpClient) { }

  validarCampos(contacto: any)
  {
    var resultado;

    if(contacto.nombre != null)
    {
      if(contacto.correo != null)
      {
        if(contacto.telefono != null)
        {
          if(contacto.asunto != null)
          {
            if(contacto.mensaje != null)
            {
              resultado = 1;
            }
          }
          else
          {
            resultado = 0;
          }
        }
        else
        {
          resultado = 0;
        }
      }
      else
      {
        resultado = 0;
      }
    }
    else
    {
      resultado = 0;
    }
    return resultado;
  }

  EnviarMensaje(contacto: any)
  {  
    return this.http.post(`${this.url}agregarContacto.php`, JSON.stringify(contacto));
  }

  listarContacto()
  {
    return this.http.get(`${this.url}listarContacto.php`);
  }

  listarContactoNuevo()
  {
    return this.http.get(`${this.url}listarContactoNuevo.php`);
  }

  eliminarContacto(iden: number)
  {
    return this.http.get(`${this.url}eliminarContacto.php?id=${iden}`);
  }

  detalleContacto(iden: number)
  {
    return this.http.get(`${this.url}detalleContacto.php?id=${iden}`);
  }
}
