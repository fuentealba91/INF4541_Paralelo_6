import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarNoticias()
  {
    return this.http.get(`${this.url}listarNoticias.php`);
  }

  detalleNoticia(iden: number)
  {
    return this.http.get(`${this.url}detalleNoticia.php?id=${iden}`);
  }

  editarNoticia(noticia)
  {
    return this.http.post(`${this.url}editarNoticia.php`, JSON.stringify(noticia));
  }

  eliminarNoticia(iden: number)
  {
    return this.http.get(`${this.url}eliminarNoticia.php?id=${iden}`);
  }

  eliminarNoticia2(iden: number)
  {
    return this.http.get(`${this.url}eliminarNoticia2.php?id=${iden}`);
  }

  eliminarNoticiaPerma(iden: number)
  {
    return this.http.get(`${this.url}eliminarNoticiaPerma.php?id=${iden}`);
  }

  subirFoto(archivo: any)
  {
    return this.http.post(`${this.url}subirFotoNoticia.php`, JSON.stringify(archivo));
  }

  agregarNoticia(noticia: any) {
    return this.http.post(`${this.url}agregarNoticia.php`, JSON.stringify(noticia));
  }
}