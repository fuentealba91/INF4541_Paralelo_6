import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarFotos()
  {
    return this.http.get(`${this.url}listarFoto.php`);
  }

  detalleFoto(iden: number)
  {
    return this.http.get(`${this.url}detalleFoto.php?id=${iden}`);
  }

  agregarFoto(foto: any)
  {
    console.log(foto);
    return this.http.post(`${this.url}agregarFoto.php`, JSON.stringify(foto));
  }

  modificarFoto(modificado)
  {
    return this.http.post(`${this.url}modificarFoto.php`, JSON.stringify(modificado));
  }

  eliminarFoto(iden: number)
  {
    return this.http.get(`${this.url}eliminarFoto.php?id=${iden}`);
  }

  subirFoto(archivo: any)
  {
    return this.http.post(`${this.url}subirFotoGaleria.php`, JSON.stringify(archivo));
  }
}
