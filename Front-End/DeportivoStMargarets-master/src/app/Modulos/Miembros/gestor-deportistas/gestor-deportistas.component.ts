import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-gestor-deportistas',
  templateUrl: './gestor-deportistas.component.html',
  styleUrls: ['./gestor-deportistas.component.css']
})
export class GestorDeportistasComponent implements OnInit {

  filtro =
  {
    nombre: "",
    deporte: "",
    categoria: "",
    estado: "",
  };

  persona = null;
  deportes: any[] = [];
  categorias = null;
  deportistas: any[] = [];
  deportista = new PersonaCategoria();
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private router: Router, private categoriaService: CategoriaService, private deporteService: DeporteService, private personaService: PersonaService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
    this.listarDeportes();
    this.listarDeportistas();
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

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          this.deportes = datos
        }
      }
    );
  }

  listarCategorias(id)
  {
    if(id != '')
    {
      this.categoriaService.listarCategoriaPorDeporte(id).subscribe
        (
          (datos: any) => { 
            if(datos)
            {
              this.categorias = datos
            }
          }
      );
    }
    else
    {
      this.categorias = null;
    }
  }

  listarDeportistas()
  {
    this.deporteService.listarDeportistas().subscribe
    (
      (datos: any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado != 0)
            {
              this.deportistas.push(datos[i]);
            }
          }
        }
      }
    );
  }

  activarDeportista(deportista)
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
            text: 'DEPORTISTA ACTIVADO',
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
            text: 'DEPORTISTA NO ACTIVADO',
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

  desactivarDeportista(deportista)
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
            text: 'DEPORTISTA DESACTIVADO',
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
            text: 'DEPORTISTA NO DESACTIVADO',
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
