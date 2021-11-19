import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaReunion } from '../../Modelos/persona-reunion';
import { RolPersona } from '../../Modelos/rol-persona';
import { DirectivaService } from '../directiva.service';
import { PersonaService } from '../persona.service';
import { ReunionService } from '../reunion.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-menu-socios',
  templateUrl: './menu-socios.component.html',
  styleUrls: ['./menu-socios.component.css']
})
export class MenuSociosComponent implements OnInit {

  persona = null;
  loginForm!: FormGroup;
  submitted:boolean = false;
  rolPersona = new RolPersona;
  personaRol: any[] = [];
  reuniones:any[] = [];
  date: Date = new Date();
  reuPendientes: any[] = [];
  invitacion = new PersonaReunion();
  cargo:boolean = false;
  rolAdministrador:boolean = false;
  rolSocio:boolean = false;
  pendiente:boolean = false;
  rolAsignado = null;
  // rolSecreDir:boolean = false;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;


  constructor(private router: Router, 
    private rolService: RolService, 
    private personaService: PersonaService, 
    private formBuilder: FormBuilder,
    private reunionService: ReunionService,
    private directivaService: DirectivaService) 
  {
    this.loginForm = this.formBuilder.group({
      profesion: new FormControl('',Validators.required),
      relacion: new FormControl('',Validators.required),
      terminos: new FormControl(false, Validators.requiredTrue)
    });
  }

  ngOnInit(): void {
    // si el usuario esta logeado se muestra, sino redirigir
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
    
    this.listarPerfil();
    this.listarDetalleSocio();
    this.listarDirectivas();
    this.listarCargo();
  }

  listarDirectivas()
  {
    this.directivaService.listarDirectivas().subscribe
    (
      (datos:any) => 
      {
        console.log(datos);
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');

        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].id_Persona == id)
          {
            console.log(id)
            if(datos[i].cargo == 'presidente')
            {
              this.cargo = true;
            }
            // if(datos[i].cargo = 'secretario')
            // {
            //   this.rolSecreDir = true;
            // }
          }
        }
      }
    )
  }

  listarCargo()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].id_persona == id)
            {
              if(datos[i].id_rol == 1)
              {
                this.rolAdministrador = true;
                console.log("ENTRE");
              }
              if((datos[i].id_rol == 2 || datos[i].id_rol == 3)&&(datos[i].estado == 1))
              {
                this.rolSocio = true;
              }
              if((datos[i].id_rol == 2 || datos[i].id_rol == 3)&&(datos[i].estado == 0))
              {
                this.pendiente = true;
              }
            }
          }
        }
      }
    )
  }

  listarReunionIdPersona()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.reunionService.listarReunionIdPersona(id).subscribe
    (
      (datos:any) =>
      {
        if(datos)
        {
          console.log(datos);
          this.reuPendientes = datos
        }
      }
    )
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos}
      );
  }

  listasProximasAsambleas()
  {
    this.reunionService.listarReunion().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          this.reuniones = [];
          for(let i=0;i<datos.length;i++)
          {
            let fecha = new Date(datos[i].fecha);
            
            if(this.date <= fecha)
            {
              this.reuniones.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarDetalleSocio()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.rolService.listarRolAsignado().subscribe
      (
        (datos: any) => 
        {
          if(datos)
          {
            for(let i=0;i<datos.length;i++)
            {
              if(datos[i].id_persona = id && (datos[i].id_rol == 2 || datos[i].id_rol == 3))
              {
                this.personaRol.push(datos[i]);
              }
            }
          }
        }
      );
  }

  eliminarSocio()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');

    this.rolService.eliminarRolAsignado(id,this.personaRol[0].id_rol).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO DESINSCRITO',
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
            text: 'SOCIO NO DESINSCRITO',
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

  registrarSocio() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      if (this.loginForm.status != 'INVALID')
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        this.rolPersona.idPersona = id;
        this.rolPersona.profesion = this.loginForm.value.profesion;
        this.rolPersona.idRol = this.loginForm.value.relacion;
        console.log(this.rolPersona);
        this.rolService.asignarRol(this.rolPersona).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'SOLICITUD ENVIADA',
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
                text: 'EL ROL YA SE ENCUENTRA ASOCIADO',
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

  aceptarInvitacion(invitacion)
  {
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 1;

    console.log(this.invitacion);

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'INVITACIÓN ACEPTADA',
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
            text: 'INVITACIÓN NO ACEPTADA',
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

  rechazarInvitacion(invitacion)
  {
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 2;

    console.log(this.invitacion);

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'INVITACIÓN RECHAZADA',
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
            text: 'INVITACIÓN NO RECHAZADA',
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

  // detalleRolAsignado()
  // {
  //   let id: number = parseInt(sessionStorage.getItem("id") || '{}');

  //   this.rolService.detalleRolAsignado(id,).subscribe
  //   ()
  // }
}
