import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deporte } from 'src/app/Modulos/Modelos/deporte';
import Swal from 'sweetalert2';
import { Categoria } from '../../Modelos/categoria';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  persona = null;
  categoria = new Categoria();
  // deporte = new Categoria();
  deportes = null;
  det = null;
  categorias = null;
  loginForm!: FormGroup;
  modificarForm!: FormGroup;
  cat = null;
  submitted:boolean = false;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
 
  constructor(private router: Router, private personaService: PersonaService, private categoriaService: CategoriaService, private formBuilder: FormBuilder, private deporteService: DeporteService) { 
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      entrenamiento: new FormControl(''),
      valores: new FormControl(''),
      edad: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
      deporte: new FormControl('',Validators.required),
    });

    this.modificarForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      entrenamiento: new FormControl(''),
      valores: new FormControl(''),
      edad: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {

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

    this.listarCategorias();
    this.listarDeportes();
    this.listarPerfil();
  }

  // soloNumeros(e)
  // {
  //   var key = window.event ? e.which : e.keyCode;
  //   if (key < 48 || key > 57) 
  //   {
  //     e.preventDefault();
  //   }
  // }

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

  listarCategorias()
  {
    this.categoriaService.listarCategorias().subscribe
      (
        (datos: any) =>  this.categorias = datos
    );
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => this.deportes = datos
    );
  }

  detalleCategoriaId(iden)
  {
    this.categoriaService.detalleCategoria(iden).subscribe
    (
      (datos: any) => {
        this.cat = datos
        this.modificarForm.controls['nombre'].setValue(this.cat![0][1]);
        this.modificarForm.controls['genero'].setValue(this.cat![0][4]);
        this.modificarForm.controls['entrenamiento'].setValue(this.cat![0][8]);
        this.modificarForm.controls['valores'].setValue(this.cat![0][9]);
        this.modificarForm.controls['edad'].setValue(this.cat![0][5]);
        this.modificarForm.controls['cupo'].setValue(this.cat![0][6]);
      }
    );
  }

  agregarCategoria() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      if (this.loginForm.status != 'INVALID')
      {
        this.categoria.nombre = this.loginForm.value.nombre;
        this.categoria.genero = this.loginForm.value.genero;
        this.categoria.entrenamiento = this.loginForm.value.entrenamiento;
        this.categoria.valores = this.loginForm.value.valores;
        this.categoria.edad = this.loginForm.value.edad;
        this.categoria.cupo = this.loginForm.value.cupo;
        this.categoria.id_deporte = this.loginForm.value.deporte;
        this.categoriaService.agregarCategoria(this.categoria).subscribe
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
                text: 'LA CATEGORÍA YA EXISTE',
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
    }
  }

  modificarCategoria()
  {
    console.log(this.cat);
    var modificado = new Categoria();

    modificado.nombre = this.modificarForm.value.nombre;
    modificado.genero = this.modificarForm.value.genero;
    modificado.entrenamiento = this.modificarForm.value.entrenamiento;
    modificado.valores = this.modificarForm.value.valores;
    modificado.edad = this.modificarForm.value.edad;
    modificado.cupo = this.modificarForm.value.cupo;
    modificado.id_deporte = this.cat![0][7];
    modificado.id = this.cat![0][0];

    console.log("MODIFICADO ", modificado);

    if(this.modificarForm.status != "INVALID")
    {
      this.categoriaService.modificarCategoria(modificado).subscribe
      (
        datos =>
        {
          if(datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title:'',
              text: 'CATEGORÍA ACTUALIZADA',
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
              title:'',
              text: 'LA CATEGORÍA YA EXISTE',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
          }
          else
          {
            Swal.fire
            ({
              title:'',
              text: 'ERROR AL ACTUALIZAR LA CATEGORÍA',
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

  eliminarCategoria(id)
  {
    this.categoriaService.eliminarCategoria(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'CATEGORIA ACTUALIZADA',
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
            text: 'CATEGORIA NO ELIMINADA',
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

  eliminarCategoria2(id)
  {
    this.categoriaService.eliminarCategoria2(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'CATEGORIA ACTUALIZADA',
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
            text: 'CATEGORIA NO ELIMINADA',
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