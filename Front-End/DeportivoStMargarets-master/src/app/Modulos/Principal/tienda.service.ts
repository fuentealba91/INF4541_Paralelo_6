import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {


  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarProductos()
  {
    return this.http.get(`${this.url}listarProductos.php`);
  }

  detalleProducto(iden: number)
  {
    return this.http.get(`${this.url}detalleProducto.php?id=${iden}`);
  }

  editarProducto(producto)
  {
    return this.http.post(`${this.url}editarProducto.php`, JSON.stringify(producto));
  }

  eliminarProducto(iden: number)
  {
    return this.http.get(`${this.url}eliminarProducto.php?id=${iden}`);
  }

  eliminarProducto2(iden: number)
  {
    return this.http.get(`${this.url}eliminarProducto2.php?id=${iden}`);
  }

  eliminarProductoPerma(iden: number)
  {
    return this.http.get(`${this.url}eliminarProductoPerma.php?id=${iden}`);
  }

  subirFoto(archivo: any)
  {
    return this.http.post(`${this.url}subirFotoTienda.php`, JSON.stringify(archivo));
  }

  agregarProducto(producto: any) {
    return this.http.post(`${this.url}agregarProducto.php`, JSON.stringify(producto));
  }
}
