import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Galeria } from '../../Modelos/galeria';
import { FotosService } from '../fotos.service';
import { MultimediaService } from '../multimedia.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent implements OnInit {

  galeria = new Galeria();
  galerias :any[]= [];
  det = null;
  fotos: any[]=[];


  constructor(private fotosService: FotosService, private multimediaService: MultimediaService, private router: Router) {}

  ngOnInit(): void {

    this.listarGalerias();
    this.listarFotos();
  }

  listarFotos()
  {
    this.fotosService.listarFotos().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          console.log(datos);
          let id = 0;
          this.fotos = [];
          for(let i=0;i<datos.length;i++)
          {
            if(this.fotos.length == 0)
            {
              this.fotos.push(datos[i]);
              id = datos[i].idGaleria;
            }
            else
            {
              if(datos[i].idGaleria > id)
              {
                this.fotos.push(datos[i]);
                id=datos[i].idGaleria;
              }
            }
          }
        }
      }
    );
  }

  listarGalerias()
  {
    this.multimediaService.listarGalerias().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.galerias.push(datos[i]);
            }
          }
        }
      }
    );
  }

  detalleGaleriaId(iden)
  {
    this.multimediaService.detalleGaleria(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

}
