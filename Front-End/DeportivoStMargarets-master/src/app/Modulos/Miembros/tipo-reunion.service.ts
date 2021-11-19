import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoReunionService 
{
  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  AgregarTipoReunion(tipo: any)
  {  
    return this.http.post(`${this.url}agregarTipoReunion.php`, JSON.stringify(tipo));
  }

  listarTipoReunion()
  {
    return this.http.get(`${this.url}listarTipoReunion.php`);
  }

  detalleTipoReunion(iden: number)
  {
    return this.http.get(`${this.url}detalleTipoReunion.php?id=${iden}`);
  }

  eliminarTipoReunion(iden: number)
  {
    return this.http.get(`${this.url}eliminarTipoReunion.php?id=${iden}`);
  }

  modificarTipoReunion(modificado)
  {
    return this.http.post(`${this.url}modificarTipoReunion.php`, JSON.stringify(modificado));
  }

  modificarEstadoTipoReunion(tipo)
  {
    return this.http.post(`${this.url}modificarEstadoTipoReunion.php`, JSON.stringify(tipo));
  }
}
