import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { RolPersona } from '../../Modelos/rol-persona';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-menu-deporte',
  templateUrl: './menu-deporte.component.html',
  styleUrls: ['./menu-deporte.component.css']
})
export class MenuDeporteComponent implements OnInit {

  loginForm!: FormGroup;
  asignar = new RolPersona();
  asignarCategoria = new PersonaCategoria();
  roles:any[] = [];
  rolAdmin = null;
  rolEntrenador = null;
  rolSecretario = null;
  listaRepresentado = null;
  deportes = null;
  categorias = null;
  cat = null;
  persona = null;
  deportesActivos:any[] = [];
  categoriasActivas:any[] = [];
  date: Date = new Date();
  fecha: Date = new Date();
  años = 0;
  pupilo = 0;
  edad = 0;
  // rolAdministrador = sessionStorage.getItem("rolAdmin") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  menor = sessionStorage.getItem("menor") || null;

  constructor
  (
    private router: Router, 
    private formBuilder: FormBuilder, 
    private rolService: RolService, 
    private personaService: PersonaService, 
    private deporteService: DeporteService, 
    private categoriaService: CategoriaService
    ) 
    {
      this.loginForm = this.formBuilder.group({
        nombre: new FormControl('',Validators.required),
        genero: new FormControl('',Validators.required),
        edad: new FormControl('',Validators.required),
        cupo: new FormControl('',Validators.required),
        deporte: new FormControl('',Validators.required),
      });
    }

  ngOnInit(): void {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarDeportes();
    this.listarPerfil();
    this.listarRoles();
    this.listarRepresentados();
    this.listarDeportesAsociados();
    this.listarRolesValidacion();
    this.edad = parseInt(sessionStorage.getItem("edad") || '{}');
  }

  listarRolesValidacion()
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
              if(datos[i].id_rol == 1)
              {
                this.rolAdmin = datos[i];
              }
              if(datos[i].id_rol == 16)
              {
                this.rolEntrenador = datos[i];
              }
              if(datos[i].id_rol == 4)
              {
                this.rolSecretario = datos[i];
              }
            }
          }
        }
      }
    )
  }

  guardarId(id)
  {
    sessionStorage.setItem("idCategoria", String(id));
  }

  asignarEdad(nacimiento)
  {
    this.fecha = new Date(nacimiento)
    this.fecha.setDate(this.fecha.getDate() + 1);
    this.años = this.date.getFullYear() - this.fecha.getFullYear();
  }

  listarRepresentados()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.listarRepresentados(id).subscribe
    (
      (datos: any) => {
        if(datos)
        {
          this.listaRepresentado = datos
        }
      }
    )
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos
        this.fecha = new Date(this.persona![0][12])
        this.fecha.setDate(this.fecha.getDate() + 1);
        this.años = this.date.getFullYear() - this.fecha.getFullYear();
        sessionStorage.setItem("edad", String(this.años));
        }
      );
  }

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].descripcion == 'Deportista')
            {
              this.roles.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarDeportesAsociados()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.deporteService.listarDeportesAsociados(id).subscribe
    (
      (datos:any) => {this.deportes = datos;}
    );
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              this.deportesActivos.push(datos[i]);
            }
          }
        }
      }
    );
  }

  detalleCategoriaId(iden)
  {
    this.categoriaService.detalleCategoria(iden).subscribe
    (
      (datos: any) => {
        if(datos)
        {
          this.cat = datos
        }
      }
    );
  }

  listarCategoriaPorDeporte(id)
  {
    this.categoriaService.listarCategoriaPorDeporte(id).subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          this.categorias = datos;
          this.categoriasActivas = [];
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado == 1)
            {
              if(datos[i].edad >= 18 && this.años >= 18)
              {
                this.categoriasActivas.push(datos[i]);
              }
              else if(datos[i].edad >= this.años)
              {
                this.categoriasActivas.push(datos[i]);
              }
            }
          }
        }
      }
    );
  }

  asignarRolyDeporte()
  {
    if((this.pupilo == 0) || (this.pupilo == null))
    {
      this.asignar.idPersona = this.persona![0][0];
      this.asignar.idRol = this.roles![0][0];
      this.asignar.profesion = '';

      this.asignarCategoria.idPersona = this.persona![0][0];
      this.asignarCategoria.idCategoria = this.cat![0][0];
    }
    else
    {
      this.asignar.idPersona = this.pupilo;
      this.asignar.idRol = this.roles![0][0];
      this.asignar.profesion = '';

      this.asignarCategoria.idPersona = this.pupilo;
      this.asignarCategoria.idCategoria = this.cat![0][0];
    }

    this.rolService.asignarRol(this.asignar).subscribe
    (
      datos =>
      {
        if(datos['respuesta'] == 1 || datos['respuesta'] == 2)
        {
          this.deporteService.asignarCategoria(this.asignarCategoria).subscribe
          (
            data => 
            {
              if(data['respuesta'] == 1)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'SOLICITUD ENVIADA',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                }).then(resultado => {
                  location.reload();
                })
              }
              else if(data['respuesta'] == 2)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'LA CATEGORÍA YA ESTA ASOCIADA',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
              }
              else
              {
                Swal.fire
                ({
                  title: '',
                  text: 'ERROR AL ASIGNAR LA CATEGORÍA',
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
            text: 'ERROR AL ASIGNAR EL ROL',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      }
    );
  }
}
