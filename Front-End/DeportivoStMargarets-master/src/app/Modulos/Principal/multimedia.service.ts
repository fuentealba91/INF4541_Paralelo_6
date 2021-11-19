import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarGalerias()
  {
    return this.http.get(`${this.url}listarGaleria.php`);
  }

  detalleGaleria(iden: number)
  {
    return this.http.get(`${this.url}detalleGaleria.php?id=${iden}`);
  }

  agregarGaleria(galeria: any)
  {
    return this.http.post(`${this.url}agregarGaleria.php`, JSON.stringify(galeria));
  }

  editarGaleria(modificado)
  {
    return this.http.post(`${this.url}editarGaleria.php`, JSON.stringify(modificado));
  }

  eliminarGaleria(iden: number)
  {
    return this.http.get(`${this.url}eliminarGaleria.php?id=${iden}`);
  }

  listarFotoGaleria(iden: number)
  {
    return this.http.get(`${this.url}listarFotoGaleria.php?id=${iden}`);
  }

}
