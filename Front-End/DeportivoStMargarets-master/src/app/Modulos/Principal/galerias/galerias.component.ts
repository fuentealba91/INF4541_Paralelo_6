import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Galeria } from '../../Modelos/galeria';
import { Fotos} from '../../Modelos/fotos'
import { MultimediaService } from '../multimedia.service';
import { FotosService } from '../fotos.service';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  galeria = new Galeria();
  galerias :any[]= [];
  foto = new Fotos();
  fotos: any[]=[];
  det = null;

  constructor(private multimediaService: MultimediaService, private router: Router, private fotosService: FotosService) { }

  ngOnInit(): void 
  {
    // this.listarGalerias();
    this.listarFotos();
  }

  // listarGalerias()
  // {
  //   this.multimediaService.listarGalerias().subscribe
  //   (
  //     (datos:any) => 
  //     {
  //       if(datos)
  //       {
  //         for(let i=0; i<datos.length;i++)
  //         {
  //           this.galerias.push(datos[i]);
  //         }
  //       }
  //     }
  //   );
  // }

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

  listarFotoGaleriaId(iden)
  {
    this.multimediaService.listarFotoGaleria(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

}
