import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarDeportistas()
  {
    return this.http.get(`${this.url}listarDeportistas.php`);
  }

  listarActividadDeportistas()
  {
    return this.http.get(`${this.url}listarActividadDeportistas.php`);
  }

  listarDeportistasAsociados(categoria)
  {
    return this.http.get(`${this.url}listarDeportistasAsociados.php?id=${categoria}`);
  }

  listarDeportistasConfirmados(id)
  {
    return this.http.get(`${this.url}listarDeportistasConfirmados.php?id=${id}`);
  }

  modificarDeportista(deportista)
  {
    return this.http.post(`${this.url}modificarDeportista.php`, JSON.stringify(deportista));
  }

  modificarInvitacion(invitacion)
  {
    return this.http.post(`${this.url}modificarInvitacion.php`, JSON.stringify(invitacion));
  }

  listarDeportesAsociados(deportista)
  {
    return this.http.get(`${this.url}listarDeportesAsociados.php?id=${deportista}`);
  }

  invitarDeportistas(invitacion)
  {
    return this.http.post(`${this.url}invitarDeportistas.php`, JSON.stringify(invitacion));
  }

  listarDeportes()
  {
    return this.http.get(`${this.url}listarDeporte.php`);
  }

  agregarDeporte(deporte: any)
  {
    return this.http.post(`${this.url}agregarDeporte.php`, JSON.stringify(deporte));
  }

  asignarCategoria(asignar: any)
  {
    return this.http.post(`${this.url}asignarCategoria.php`, JSON.stringify(asignar));
  }

  listarTipoActividad()
  {
    return this.http.get(`${this.url}listarTipoActividad.php`);
  }

  listarEventos()
  {
    return this.http.get(`${this.url}listarEventosDeportivos.php`);
  }

  listarEventosDeportivosPorIdCategoria(id)
  {
    return this.http.get(`${this.url}listarEventosDeportivosPorIdCategoria.php?id=${id}`);
  }

  detalleEventoDeportivo(id)
  {
    return this.http.get(`${this.url}detalleEventoDeportivo.php?id=${id}`);
  }

  agregarEventoDeportivo(evento:any)
  {
    return this.http.post(`${this.url}agregarEventoDeportivo.php`, JSON.stringify(evento));
  }

  detalleDeporte(iden: number)
  {
    return this.http.get(`${this.url}detalleDeporte.php?id=${iden}`);
  }

  eliminarDeporte(iden: number)
  {
    return this.http.get(`${this.url}eliminarDeporte.php?id=${iden}`);
  }

  eliminarDeporte2(iden: number)
  {
    return this.http.get(`${this.url}eliminarDeporte2.php?id=${iden}`);
  }

  eliminarEventoDeportivo(iden: number) {
    return this.http.get(`${this.url}eliminarEventoDeportivo.php?id=${iden}`);
  }

  modificarDeporte(modificado)
  {
    return this.http.post(`${this.url}modificarDeporte.php`, JSON.stringify(modificado));
  }

  agregarResultado(resultado)
  {
    return this.http.post(`${this.url}agregarResultado.php`, JSON.stringify(resultado));
  }
}
