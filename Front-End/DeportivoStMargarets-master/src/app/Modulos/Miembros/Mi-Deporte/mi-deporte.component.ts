import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PersonaActividad } from '../../Modelos/persona-actividad';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-mi-deporte',
  templateUrl: './mi-deporte.component.html',
  styleUrls: ['./mi-deporte.component.css']
})
export class MiDeporteComponent implements OnInit {

  persona = null;
  deporte:any[] = [];
  eventos:any[] = [];
  id = null;
  date: Date = new Date();
  actPendientes:any[] = [];
  evento = new PersonaActividad();
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private deporteService: DeporteService, private personaService: PersonaService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.listarPerfil();
    this.listarCategoria();
    // this.listarEventosDeportivosPorIdCategoria();
    this.listarActividadDeportistas();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {this.persona = datos}
    );
  }

  listarActividadDeportistas()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    let idCat: number = parseInt(sessionStorage.getItem("idCategoria") || '{}');
    this.deporteService.listarActividadDeportistas().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          this.actPendientes = [];
          for(let i=0;i<datos.length;i++)
          {
            let fecha = new Date(datos[i].fecha)
            if((datos[i].idPersona == id) && (fecha > this.date) && (datos[i].categoria == idCat))
            {
              this.actPendientes.push(datos[i]);
            }
          }
        }
      }
    )
  }

  listarCategoria()
  {
    let id: number = parseInt(sessionStorage.getItem("idCategoria") || '{}');
    this.categoriaService.listarCategorias().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].idCategoria == id)
            {
              // console.log(datos[i]);
              this.deporte.push(datos[i]);
              this.id = datos[i].idCategoria;
            }
          }
          // this.listarEventosDeportivosPorIdCategoria();
        }
      }
    );
  }

  listarEventosDeportivosPorIdCategoria()
  {
    this.deporteService.listarEventosDeportivosPorIdCategoria(this.id).subscribe
    (
      (datos: any) => 
      {
        this.eventos = [];

        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            let fecha = new Date(datos[i].fecha);
            
            if(this.date <= fecha)
            {
              this.eventos.push(datos[i]);
            }
          }
        }
      }
    );
  }

  aceptarEvento(invitacion)
  {
    this.evento.id = invitacion.id;
    this.evento.idPersona = invitacion.idPersona;
    this.evento.idActividad = invitacion.idActividad;
    this.evento.asistio = 1;

    this.deporteService.modificarInvitacion(this.evento).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'EVENTO ACEPTADO',
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
            text: 'EVENTO NO ACEPTADO',
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

  rechazarEvento(invitacion)
  {
    this.evento.id = invitacion.id;
    this.evento.idPersona = invitacion.idPersona;
    this.evento.idActividad = invitacion.idActividad;
    this.evento.asistio = 2;

    this.deporteService.modificarInvitacion(this.evento).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'EVENTO RECHAZADO',
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
            text: 'EVENTO NO RECHAZADO',
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
