import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tienda } from '../../Modelos/tienda';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  producto = new Tienda();
  productos:any[] = [];
  det = null;

  constructor(private tiendaService: TiendaService, private router: Router) { }

  ngOnInit(): void {

    this.listarProductos();
  }

  listarProductos()
  {
    this.tiendaService.listarProductos().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.productos.push(datos[i]);
            }
          }
        }
      }
    );
  }

}
