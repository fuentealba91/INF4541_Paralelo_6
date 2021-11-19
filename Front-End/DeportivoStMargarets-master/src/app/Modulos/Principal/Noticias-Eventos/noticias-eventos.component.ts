import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from '../../Modelos/noticias';
import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-noticias-eventos',
  templateUrl: './noticias-eventos.component.html',
  styleUrls: ['./noticias-eventos.component.css']
})
export class NoticiasEventosComponent implements OnInit {

  noticia = new Noticias();
  noticias:any[] = [];
  det = null;

  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit(): void {

    this.listarNoticias();
  }

  listarNoticias()
  {
    this.noticiasService.listarNoticias().subscribe
    (
      (datos:any) => {console.log(datos)
        if(datos)
        {
          for (let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.noticias.push(datos[i]);
            }
          }
        }
      }

    );

  }

}
