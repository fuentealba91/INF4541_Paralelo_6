import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Actividad } from '../../Modelos/actividad';
import { PersonaActividad } from '../../Modelos/persona-actividad';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-evento-deportivo',
  templateUrl: './evento-deportivo.component.html',
  styleUrls: ['./evento-deportivo.component.css']
})
export class EventoDeportivoComponent implements OnInit {

  actividades = null;
  tipos: any[] = [];
  deportes: any[] = [];
  categorias: any[] = [];
  actividad = new Actividad();
  det = null;
  loginForm!: FormGroup;
  resultadoForm!: FormGroup;
  submitted:boolean = false;
  date: Date = new Date();
  invitacion = new PersonaActividad();
  deportistas:any[] = [];
  eventoMayor = 0;
  persona = null;
  confirmados:any[] = [];
  evento = new PersonaActividad();
  roles:any[] = [];
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private personaService: PersonaService, 
    private categoriaService: CategoriaService, 
    private deporteService: DeporteService,
    private rolService: RolService) 
    {
      this.loginForm = this.formBuilder.group({
        fecha: new FormControl('',Validators.required),
        deporte: new FormControl('',Validators.required),
        categoria: new FormControl('',Validators.required),
        lugar: new FormControl('',Validators.required),
        objetivo: new FormControl('',Validators.required),
        tipo: new FormControl('',Validators.required)
      })
      this.resultadoForm = this.formBuilder.group({
        // idActividad: new FormControl('',Validators.required),
        tipo: new FormControl('',Validators.required),
        deporte: new FormControl('',Validators.required),
        categoria: new FormControl('',Validators.required),
        resultado: new FormControl('',Validators.required)
      })
    }

  ngOnInit(): void
  {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }
    
    this.listarEventos();
    this.listarDeportes();
    this.listarTipoActividad();
    this.listarPerfil();
    this.listarRoles();

    if(this.roles == [])
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }
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

  listarRoles()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        console.log(datos);
        if(datos)
        {
          for(let i=0; i<datos.length; i++)
          {
            if(id == datos[i].id_persona)
            {
              if(datos[i].id_rol == 1 || datos[i].id_rol == 16)
              {
                this.roles.push(datos[i]);
              }
            }
          }
          console.log(this.roles);
        }
      }
    )
  }

  listarCategorias(id)
  {
    if(id != '')
    {
      this.categoriaService.listarCategoriaPorDeporte(id).subscribe
        (
          (datos: any) => 
          { 
            if(datos)
            {
              for(let i=0;i<datos.length;i++)
              {
                if(datos[i].estado == 1)
                {
                  this.categorias.push(datos[i]);
                }
              }
            }
          }
      );
    }
    else
    {
      this.categorias = [];
    }
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.deportes.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarTipoActividad()
  {
    this.deporteService.listarTipoActividad().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.tipos.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarEventos()
  {
    this.deporteService.listarEventos().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          this.actividades = datos
          let numero = 0;
          for(let i=0;i<datos.length;i++)
          {
            if(Number(datos[i].idActividad) > numero)
            {
              this.eventoMayor = datos[i].idActividad;
              numero = datos[i].idActividad;
            }
          }
          console.log(datos);
          console.log(this.eventoMayor);
        }
      }
    );
  }

  detalleEventoId(iden)
  {
    this.deporteService.detalleEventoDeportivo(iden).subscribe
    (
      (datos:any) => 
      {
        this.det = datos,
        this.resultadoForm.controls['tipo'].setValue(datos[0].descripcion);
        this.resultadoForm.controls['deporte'].setValue(datos[0].deporte);
        this.resultadoForm.controls['categoria'].setValue(datos[0].categoria);
        this.resultadoForm.controls['resultado'].setValue(datos[0].resultado);
      }
    );
  }

  listarDeportistasAsociados(categoria)
  {
    this.deporteService.listarDeportistasAsociados(categoria).subscribe(
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == "1")
            {
              this.deportistas.push(datos[i]);
            }
          }

          this.invitarDeportistas();
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'NO EXISTEN DEPORTISTAS A INVITAR',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          }).then(resultado => {
            this.listarEventos();
            location.reload();
          })
        }
      }
    )
  }

  listarDeportistasConfirmados(id)
  {
    this.deporteService.listarDeportistasConfirmados(id).subscribe(
      (datos:any) => 
      {
        for(let i=0; i<datos.length; i++)
        {
          if(datos[i].asistio != 2 && datos[i].asistio != 0)
          {
            this.confirmados.push(datos[i]);
          }
        }
      }
    )
  }

  invitarDeportistas()
  {
    let result = 0;
    console.log(this.deportistas.length);
    for(let i = 0; i<this.deportistas.length; i++)
    {
      this.invitacion.idPersona = this.deportistas[i].idPersona;
      this.invitacion.idActividad = this.eventoMayor;
      console.log("INVITACION ",this.invitacion);
      this.deporteService.invitarDeportistas(this.invitacion).subscribe(
        datos => 
        {
          if(datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES ENVIADAS',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarEventos();
              location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES NO ENVIADAS',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarEventos();
              location.reload();
            })
          }
        }
      )
    }
    return result;
  }

  agregarEventoDeportivo() 
  {
    this.submitted = true;
    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      if(this.loginForm.status != 'INVALID')
      {
        let fecha = new Date(this.loginForm.value.fecha);
        let comparar = new Date();
        comparar.setDate(comparar.getDate()+1);

        if(comparar < fecha)
        {
          this.actividad.fecha = this.loginForm.value.fecha;
          this.actividad.deporte = this.loginForm.value.deporte;
          this.actividad.categoria = this.loginForm.value.categoria;
          this.actividad.lugar = this.loginForm.value.lugar;
          this.actividad.objetivo = this.loginForm.value.objetivo;
          this.actividad.tipoActividad = this.loginForm.value.tipo;

          this.deporteService.agregarEventoDeportivo(this.actividad).subscribe(
            datos => {
              console.log(datos);
              if (datos['respuesta'] == 1) 
              {
                Swal.fire
                ({
                  title: '',
                  text: 'EVENTO CREADO',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
                  this.listarEventos();
                  // this.listarDeportistasAsociados(this.actividad.categoria);
                })
                .then(resultado => {
                  setTimeout(() => {
                    this.listarDeportistasAsociados(this.actividad.categoria);
                  }, 100);
                })
              }
              else if (datos['respuesta'] == 2) 
              {
                Swal.fire
                ({
                  title: '',
                  text: 'EL EVENTO YA EXISTE',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
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
            text: 'LA FECHA DEBE SER 1 DÍA MAYOR A LA ACTUAL',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      }
    }
  }

  eliminarEventoDeportivo(id)
  {
    let fechaEliminar = new Date(this.det![0][1])
    if(fechaEliminar < this.date)
    {
      Swal.fire
      ({
        title: '',
        text: 'EL EVENTO YA FUE REALIZADO',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
    else
    {
      this.deporteService.eliminarEventoDeportivo(id).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'EVENTO ELIMINADO',
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
              text: 'EVENTO NO ELIMINADO',
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

  agregarResultado()
  {
    this.submitted = true;

    if(this.resultadoForm.invalid)
    {
      return;
    }
    else
    {
      if(this.resultadoForm.status != 'INVALID')
      {
        let resultado = new Actividad();
        resultado.idActividad = this.det![0][0];
        resultado.resultado = this.resultadoForm.value.resultado;

        this.deporteService.agregarResultado(resultado).subscribe
        (
          datos => 
          {
            if (datos['resultado'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'RESULTADO AGREGADO',
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
                text: 'RESULTADO NO AGREGADO',
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
        )
      }
    }
  }

  confirmarAsistencia(invitacion)
  {
    this.evento.id = invitacion.id;
    this.evento.idPersona = invitacion.idPersona;
    this.evento.idActividad = invitacion.idActividad;
    this.evento.asistio = 3;

    this.deporteService.modificarInvitacion(this.evento).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarDeportistasConfirmados(invitacion.idActividad);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarDeportistasConfirmados(invitacion.idActividad);
          })
        }
      }
    );
  }

  rechazarAsistencia(invitacion)
  {
    this.evento.id = invitacion.id;
    this.evento.idPersona = invitacion.idPersona;
    this.evento.idActividad = invitacion.idActividad;
    this.evento.asistio = 4;

    this.deporteService.modificarInvitacion(this.evento).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarDeportistasConfirmados(invitacion.idActividad);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarDeportistasConfirmados(invitacion.idActividad);
          })
        }
      }
    );
  }
}