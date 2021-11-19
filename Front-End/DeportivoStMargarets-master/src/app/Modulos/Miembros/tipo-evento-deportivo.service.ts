import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoDeportivoService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) 
  {}

  agregarTipoEvento(actividad: any)
  {  
    return this.http.post(`${this.url}agregarTipoEventoDeportivo.php`, JSON.stringify(actividad));
  }

  detalleTipoEvento(iden: number)
  {
    return this.http.get(`${this.url}detalleTipoEvento.php?id=${iden}`);
  }

  modificarTipoEvento(modificado)
  {
    return this.http.post(`${this.url}modificarTipoEvento.php`, JSON.stringify(modificado));
  }

  modificarEstadoTipoEvento(evento)
  {
    return this.http.post(`${this.url}modificarEstadoTipoEvento.php`, JSON.stringify(evento));
  }
}
