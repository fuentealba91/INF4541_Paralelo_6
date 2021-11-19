import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../Modelos/rol';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  rol = new Rol();
  persona = null;
  roles = null;
  det = null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  
  constructor(private personaService: PersonaService, private router: Router, private rolService: RolService) { }

  ngOnInit(): void 
  {
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

    this.listarRoles();
    this.listarPerfil();
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

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => this.roles = datos
    );
  }

  validarCampo()
  {
    if((this.rol.descripcion == undefined)||(this.rol.descripcion == ''))
    {
      alert(this.rol.descripcion);
    }
  }

  agregarRol()
  {
    this.rolService.AgregarRol(this.rol).subscribe
    (
      datos=>
      {
        if(datos['respuesta'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOLICITUD ENVIADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else if(datos['respuesta'] == 2)
        {
          Swal.fire
          ({
            title: '',
            text: 'EL ROL YA EXISTE',
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

  detalleRolId(iden)
  {
    this.rolService.detalleRol(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  eliminarRol(id)
  {
    this.rolService.eliminarRol(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ROL ELIMINADO',
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
            text: 'ROL NO ELIMINADO',
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

  modificarRol()
  {
    var modificado = new Rol();
    modificado.id_rol = parseInt((<HTMLInputElement>document.getElementById("id")).value);
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
      this.rolService.modificarRol(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'ROL MODIFICADO',
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
              text: 'EL ROL YA EXISTE',
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
              text: 'ROL NO MODIFICADO',
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
}
