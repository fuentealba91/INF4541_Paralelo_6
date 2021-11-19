import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from '../../Modelos/noticias';
import { NoticiasService } from '../noticias.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

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
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
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

  detalleNoticiaId(iden)
  {
    this.noticiasService.detalleNoticia(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }
}
