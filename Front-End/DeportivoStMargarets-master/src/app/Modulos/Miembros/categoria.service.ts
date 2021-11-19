import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarCategorias()
  {
    return this.http.get(`${this.url}listarCategoria.php`);
  }

  listarCategoriaPorDeporte(id)
  {
    return this.http.get(`${this.url}listarCategoriaPorDeporte.php?id=${id}`);
  }

  listarDeportes()
  {
    return this.http.get(`${this.url}listarDeporte.php`);
  }

  agregarCategoria(categoria: any)
  {
    return this.http.post(`${this.url}agregarCategoria.php`, JSON.stringify(categoria));
  }

  listarTipoActividad()
  {
    return this.http.get(`${this.url}listarTipoActividad.php`);
  }

  listarEventos()
  {
    return this.http.get(`${this.url}listarEventosDeportivos.php`);
  }

  detalleEventoDeportivo(id)
  {
    return this.http.get(`${this.url}detalleEventoDeportivo.php?id=${id}`);
  }

  agregarEventoDeportivo(evento:any)
  {
    return this.http.post(`${this.url}agregarEventoDeportivo.php`, JSON.stringify(evento));
  }

  detalleCategoria(iden: number)
  {
    return this.http.get(`${this.url}detalleCategoria.php?id=${iden}`);
  }

  eliminarCategoria(iden: number)
  {
    return this.http.get(`${this.url}eliminarCategoria.php?id=${iden}`);
  }

  eliminarCategoria2(iden: number)
  {
    return this.http.get(`${this.url}eliminarCategoria2.php?id=${iden}`);
  }

  eliminarEventoDeportivo(iden: number) {
    return this.http.get(`${this.url}eliminarEventoDeportivo.php?id=${iden}`);
  }

  modificarCategoria(modificado)
  {
    return this.http.post(`${this.url}modificarCategoria.php`, JSON.stringify(modificado));
  }

  agregarResultado(resultado)
  {
    return this.http.post(`${this.url}agregarResultado.php`, JSON.stringify(resultado));
  }
}
