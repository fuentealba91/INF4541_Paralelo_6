import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { RolPersona } from '../../Modelos/rol-persona';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-gestor-solicitudes',
  templateUrl: './gestor-solicitudes.component.html',
  styleUrls: ['./gestor-solicitudes.component.css']
})
export class GestorSolicitudesComponent implements OnInit {

  rolSocio = new RolPersona();
  socios:any [] =[];
  persona = null;
  deportistas:any[] = [];
  deportista = new PersonaCategoria();
  cantInternos = 0;
  cantExternos = 0;
  total = 0;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;


  constructor(private router: Router, private rolService: RolService,private personaService: PersonaService, private deporteService: DeporteService) { }

  ngOnInit(): void 
  {
    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }
    
    if((sessionStorage.getItem("rolAdmin") == null)&&(sessionStorage.getItem("rolSecretario") == null)&&(sessionStorage.getItem("rolSecreDir") == null))
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
    this.listarDeportistasPendientes();
    this.listarSociosPendientes();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => this.persona = datos
    );
  }

  listarSociosPendientes()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos: any) => {
        console.log(datos);
        if(datos != null)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 0 && (datos[i].id_rol == 2 || datos[i].id_rol == 3))
            {
              this.socios.push(datos[i]);
            }
            if(datos[i].id_rol == 2 && datos[i].estado != 0)
            {
              this.cantInternos = this.cantInternos + 1;
            }
            if(datos[i].id_rol == 3 && datos[i].estado != 0)
            {
              this.cantExternos = this.cantExternos + 1;
            }
            if(datos[i].estado != 0 && datos[i].estado != 2)
            {
              this.total = this.total + 1;
            }
          }
          if(this.cantInternos != 0)
          {
            this.cantInternos = ((this.cantInternos * 100)/(this.total));
          }
          if(this.cantExternos != 0)
          {
            this.cantExternos = ((this.cantExternos * 100)/(this.total));
          }
        }
      }
    );
  }

  listarDeportistasPendientes()
  {
    this.deporteService.listarDeportistas().subscribe
    (
      (datos: any) => {
        if(datos != null)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 0)
            {
              this.deportistas.push(datos[i]);
            }
          }
        }
      }
    );
  }

  aceptarSocio(socio)
  {
    console.log(socio);
    this.rolSocio.idPersona = socio.id_persona;
    this.rolSocio.idRol = socio.id_rol;
    this.rolSocio.estado = 1;

    if(socio.id_rol == 3)
    {
      let porcentaje = ((1*100)/(this.total + 1));
      porcentaje = porcentaje + this.cantExternos;
      console.log("PORCENTAJE ", porcentaje)
      if(porcentaje > 33)
      {
        Swal.fire
        ({
          title: '',
          text: 'LIMITE DE SOCIOS EXTERNOS SUPERADO',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          showConfirmButton: true
        })
      }
      else
      {
        this.rolService.modificarRolAsignado(this.rolSocio).subscribe
        (
          datos =>
          {
            if (datos['resultado'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'SOCIO ACEPTADO',
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
                text: 'SOCIO NO ACEPTADO',
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
    else
    {
      this.rolService.modificarRolAsignado(this.rolSocio).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'SOCIO ACEPTADO',
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
              text: 'SOCIO NO ACEPTADO',
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

  rechazarSocio(socio)
  {
    // console.log(socio);
    this.rolSocio.idPersona = socio.id_persona;
    this.rolSocio.idRol = socio.id_rol;
    this.rolSocio.estado = 2;

    this.rolService.eliminarRolAsignado(this.rolSocio.idPersona, this.rolSocio.idRol).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO RECHAZADO',
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
            text: 'SOCIO NO RECHAZADO',
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

  aceptarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 1;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA ACEPTADO',
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
            text: 'DEPORTISTA NO ACEPTADO',
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

  rechazarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 2;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA RECHAZADO',
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
            text: 'DEPORTISTA NO RECHAZADO',
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
