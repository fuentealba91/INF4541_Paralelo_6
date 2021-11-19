import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import { Galeria } from '../../Modelos/galeria';
import { MultimediaService } from '../../Principal/multimedia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  galeria = new Galeria();
  galerias = null;
  det = null;
  persona = null;
  perfil=null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private router: Router, private personaService: PersonaService, private multimediaService: MultimediaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    if((sessionStorage.getItem("rolAdmin") == null)&&(sessionStorage.getItem("rolSecretario") == null))
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }
    
    this.listarGalerias();
    this.listarPerfil();

  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.perfil = datos
      );
    
  }

  listarGalerias()
  {
    this.multimediaService.listarGalerias().subscribe
    (
      (datos:any) => this.galerias = datos
    );
  }

  detalleGaleriaId(iden)
  {
    this.multimediaService.detalleGaleria(iden).subscribe
    (
      (datos:any) => {this.det = datos, console.log(datos)}
    );
  }

  agregarGaleria() 
  {
    if ((this.galeria.titulo != null) && (this.galeria.titulo != ''))
    {
      this.multimediaService.agregarGaleria(this.galeria).subscribe
      (
        datos =>
        {
          if (datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'REGISTRO EXITOSO',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => {
              location.reload();
            })
          }
          else if (datos['respuesta'] == 2)
          {
            Swal.fire
            ({
              title: '',
              text: 'EL DEPORTE YA EXISTE',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado =>
            {
              location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'ERROR AL ENVIAR LA SOLICITUD',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
          }
        }
      )
    }
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'DEBE INGRESAR EL NOMBRE',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }

  editarGaleria()
  {
    var modificado = new Galeria();
    modificado.id = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    modificado.titulo = (<HTMLInputElement>document.getElementById("desc")).value;

    if(modificado.titulo == "")
    {
      Swal.fire
      ({
        title:'',
        text: 'EL CAMPO NO PUEDE ESTAR VACÍO',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
      .then(resultado =>
      {
        location.reload();
      })
    }
    else
    {
      this.multimediaService.editarGaleria(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'DEPORTE MODIFICADO',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado =>
            {
                location.reload();
            })
          }
          else if(datos['resultado'] == 2)
          {
            Swal.fire
            ({
              title: '',
              text: 'EL DEPORTE YA EXISTE',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => 
            {
              location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'DEPORTE NO MODIFICADO',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => 
            {
              location.reload();
            })
          }
        }
      );
    }
  }

  eliminarGaleria(id)
  {
    this.multimediaService.eliminarGaleria(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'NOTICIA ELIMINADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTE NO ELIMINADO',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
      }
    );
  }

}
