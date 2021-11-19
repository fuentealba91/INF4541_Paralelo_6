import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Modulos/Modelos/persona';
import { RolPersona } from 'src/app/Modulos/Modelos/rol-persona';
import Swal from 'sweetalert2';
import { PersonaService } from '../../persona.service';
import { RolService } from '../../rol.service';

@Component({
  selector: 'app-asignacion-rol',
  templateUrl: './asignacion-rol.component.html',
  styleUrls: ['./asignacion-rol.component.css']
})
export class AsignacionRolComponent implements OnInit {

  personas = null;
  roles = null;
  asignado = null;
  asignar = new RolPersona();
  det =  null;
  persona = null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private router: Router,private personaService: PersonaService, private rolService: RolService) { }

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
    this.listarPersona();
    this.listarRoles();
    this.listarRolesAsignados();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos,
        console.log(this.persona)
      }
    );
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => this.roles = datos
    );
  }

  listarRolesAsignados()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => this.asignado = datos
    )
  }

  detalleRolAsignadoId(idPersona,idRol)
  {
    this.rolService.detalleRolAsignado(idPersona,idRol).subscribe
    (
      (datos:any) => this.det = datos
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
            text: 'ASOCIACIÓN ELIMINADA',
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
            text: 'ASOCIACiÓN NO ELIMINADA',
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

  // modificarRolAsignado()
  // {
  //   var modificado = new Rol();
  //   modificado.id_rol = parseInt((<HTMLInputElement>document.getElementById("id")).value);
  //   modificado.descripcion = (<HTMLInputElement>document.getElementById("desc")).value;

  //   if(modificado.descripcion == "")
  //   {
  //     Swal.fire
  //     ({
  //       title:'',
  //       text: 'EL CAMPO NO PUEDE ESTAR VACÍO',
  //       icon: 'error',
  //       confirmButtonText: 'Aceptar',
  //       showConfirmButton: true
  //     })
  //     .then(resultado =>
  //     {
  //       location.reload();
  //     })
  //   }
  //   else
  //   {
  //     this.rolService.modificarRol(modificado).subscribe
  //     (
  //       datos =>
  //       {
  //         if (datos['resultado'] == 1)
  //         {
  //           Swal.fire
  //           ({
  //             title: '',
  //             text: 'ROL MODIFICADO',
  //             icon: 'success',
  //             confirmButtonText: 'Aceptar',
  //             showConfirmButton: true
  //           })
  //           .then(resultado =>
  //           {
  //               location.reload();
  //           })
  //         }
  //         else if(datos['resultado'] == 2)
  //         {
  //           Swal.fire
  //           ({
  //             title: '',
  //             text: 'EL ROL YA EXISTE',
  //             icon: 'error',
  //             confirmButtonText: 'Aceptar',
  //             showConfirmButton: true
  //           })
  //           .then(resultado => 
  //           {
  //             location.reload();
  //           })
  //         }
  //         else
  //         {
  //           Swal.fire
  //           ({
  //             title: '',
  //             text: 'ROL NO MODIFICADO',
  //             icon: 'error',
  //             confirmButtonText: 'Aceptar',
  //             showConfirmButton: true
  //           })
  //           .then(resultado => 
  //           {
  //             location.reload();
  //           })
  //         }
  //       }
  //     );
  //   }
  // }

  asignarRol()
  {
    if ((this.asignar.idPersona != null && this.asignar.idPersona != 0)&&(this.asignar.idRol != null && this.asignar.idRol != 0))
    {
      this.asignar.profesion = '';
      this.rolService.asignarRol(this.asignar).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
                ({
                  title: '',
                  text: 'ROL ASIGNADO',
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
                  text: 'ROL YA ASIGNADO',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
            }
          }
        );
    }
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'TODOS LOS CAMPOS DEBEN SER LLENADOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
