import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoActividad } from '../../Modelos/tipo-actividad';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';
import { TipoEventoDeportivoService } from '../tipo-evento-deportivo.service';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.css']
})
export class TipoActividadComponent implements OnInit {

  persona = null;
  tipos = null;
  actividad = new TipoActividad();
  det = null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private router: Router, private deporteService: DeporteService, private personaService: PersonaService, private tipoEventoService: TipoEventoDeportivoService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
    this.listarTipoActividad();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos
      }
    );
  }

  listarTipoActividad()
  {
    this.deporteService.listarTipoActividad().subscribe
    (
      (datos:any) => {this.tipos = datos}
    );
  }

  agregarTipoEvento() {
    if ((this.actividad.descripcion != null) && (this.actividad.descripcion != ''))
    {
      this.tipoEventoService.agregarTipoEvento(this.actividad).subscribe
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
              text: 'EL TIPO DE EVENTO YA EXISTE',
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

  detalleTipoEventoPorId(iden)
  {
    this.tipoEventoService.detalleTipoEvento(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  modificarTipoEventoDeportivo()
  {
    var modificado = new TipoActividad();
    modificado.idTipo_Actividad = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    modificado.descripcion = (<HTMLInputElement>document.getElementById("desc")).value;

    if(modificado.descripcion == "")
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
      this.tipoEventoService.modificarTipoEvento(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'TIPO DE EVENTO MODIFICADO',
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
              text: 'EL TIPO DE EVENTO YA EXISTE',
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
              text: 'TIPO DE EVENTO NO MODIFICADO',
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

  activarTipoEvento(evento)
  {
    let modificado = new TipoActividad();
    modificado.idTipo_Actividad = evento;
    modificado.estado = 1;

    this.tipoEventoService.modificarEstadoTipoEvento(modificado).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'TIPO DE EVENTO ACTIVADO',
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
            text: 'TIPO DE EVENTO NO ACTIVADO',
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

  desactivarTipoEvento(evento)
  {
    let modificado = new TipoActividad();
    modificado.idTipo_Actividad = evento;
    modificado.estado = 0;

    this.tipoEventoService.modificarEstadoTipoEvento(modificado).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'TIPO DE EVENTO DESACTIVADO',
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
            text: 'TIPO DE EVENTO NO DESACTIVADO',
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
