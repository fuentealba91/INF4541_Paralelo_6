import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolPersona } from '../../Modelos/rol-persona';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-gestor-socios',
  templateUrl: './gestor-socios.component.html',
  styleUrls: ['./gestor-socios.component.css']
})
export class GestorSociosComponent implements OnInit {

  filtro =
  {
    tipo: "",
    estado: "",
  };

  persona = null;
  socios:any[] = [];
  det = null;
  rolAdministrador = sessionStorage.getItem("rolAdmin") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;

  constructor(private router: Router, private rolService: RolService, private personaService: PersonaService) { }

  ngOnInit(): void 
  {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    if(this.rolAdministrador == null && this.rolSecreDir == null)
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
    this.listarSocios();
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

  listarSocios()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        console.log(datos)
        if(datos)
        {
          for(let i=0; i<datos.length; i++)
          {
            if(datos[i].id_rol == 2 || datos[i].id_rol == 3)
            {
              if(datos[i].estado != 0)
              {
                this.socios.push(datos[i]);
              }
            }
          }
        }
      }
    )
  }
  detalleRolAsignadoId(idPersona,idRol)
  {
    this.rolService.detalleRolAsignado(idPersona,idRol).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  activarSocio(socio)
  {
    let rolSocio = new RolPersona();
    rolSocio.idRol = socio.id_rol;
    rolSocio.idPersona = socio.id_persona;
    rolSocio.estado = 1;

    this.rolService.modificarRolAsignado(rolSocio).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO ACTIVADO',
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
            text: 'SOCIO NO ACTIVADO',
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

  desactivarSocio(socio)
  {
    let rolSocio = new RolPersona();
    rolSocio.idRol = socio.id_rol;
    rolSocio.idPersona = socio.id_persona;
    rolSocio.estado = 2;

    this.rolService.modificarRolAsignado(rolSocio).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO DESCTIVADO',
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
            text: 'SOCIO NO DESCTIVADO',
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

  eliminarRolAsignado(idPersona,idRol)
  {
    this.rolService.eliminarRolAsignado(idPersona,idRol).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOCIO ELIMINADO',
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
            text: 'SOCIO NO ELIMINADO',
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
