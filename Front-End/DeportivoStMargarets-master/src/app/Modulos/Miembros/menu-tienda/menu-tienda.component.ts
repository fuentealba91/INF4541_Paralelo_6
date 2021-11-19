import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import { Tienda } from '../../Modelos/tienda';
import { TiendaService } from '../../Principal/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-tienda',
  templateUrl: './menu-tienda.component.html',
  styleUrls: ['./menu-tienda.component.css']
})
export class MenuTiendaComponent implements OnInit {

  producto = new Tienda();
  productos = null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  perfil = null;
  det:any[] = [];
  loginForm!: FormGroup;
  agregarForm!: FormGroup;
  submitted:boolean = false;
  editado = new Tienda();
  deta = null;

  archivo = 
  {
    nombre: "",
    nombreArchivo: "",
    base64textString: ""
  }

  constructor(private router: Router, private personaService: PersonaService, private tiendaService: TiendaService, private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({
      id: new FormControl(''),
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      foto: new FormControl(''),
      precio: new FormControl(''),
    });

    this.agregarForm = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
  }

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

    this.listarPerfil();
    this.listarProductos();
  }

  subirFoto()
  {
    this.tiendaService.subirFoto(this.archivo).subscribe
    (
      datos => 
      {
        if(datos == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ARCHIVO SUBIDO',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado => {
            location.reload();
          })
        }
      }
    )
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.perfil = datos
      );
    
  }

  listarProductos()
  {
    this.tiendaService.listarProductos().subscribe
    (
      (datos:any) => this.productos = datos
    );
  }

  detalleProductoId(iden)
  {
    this.tiendaService.detalleProducto(iden).subscribe
    (
      (datos:any) => {this.deta = datos, console.log(datos)}
    );
  }

  detalleProducto(iden)
  {
    this.tiendaService.detalleProducto(iden).subscribe
    (
        (datos: any) => 
        {
          console.log(datos);
          this.det = datos
          this.loginForm.controls['id'].setValue(datos[0].idTienda);
          this.loginForm.controls['titulo'].setValue(datos[0].titulo);
          this.loginForm.controls['descripcion'].setValue(datos[0].descripcion);
          this.loginForm.controls['precio'].setValue(datos[0].precio);
        }
    );
  }

  editarProducto()
  {
    this.submitted = true;
    if (this.loginForm.status != "INVALID")
    { 
        if (this.archivo.nombreArchivo != "")
        {
          console.log(this.archivo);
          this.tiendaService.subirFoto(this.archivo).subscribe(
            datos => {
              if (datos == 1)
              {
                this.editado.id = this.loginForm.value.id;
                this.editado.titulo = this.loginForm.value.titulo;
                this.editado.descripcion = this.loginForm.value.descripcion;
                this.editado.foto = this.archivo.nombreArchivo;
                this.editado.precio = this.loginForm.value.precio;

                console.log(this.editado);

                this.tiendaService.editarProducto(this.editado).subscribe(
                  datos => {
                    if (datos['resultado'] == 1) {
                      Swal.fire
                      ({
                        title: '',
                        text: 'PRODUCTO MODIFICADO',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        showConfirmButton: true
                      })
                      .then(resultado => {
                        location.reload();
                      })
                    }
                    else {
                      Swal.fire
                      ({
                        title: '',
                        text: 'PRODUCTO NO MODIFICADO',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        showConfirmButton: true
                      })
                    }
                  }
                )
              }
            }
          )
        }
        else
        {
          this.editado.id = this.loginForm.value.id;
          this.editado.titulo = this.loginForm.value.titulo;
          this.editado.descripcion = this.loginForm.value.descripcion;
          this.editado.foto = this.archivo.nombreArchivo;
          this.editado.precio = this.loginForm.value.precio;

          console.log(this.editado);

          this.tiendaService.editarProducto(this.editado).subscribe(
            datos => {
              if (datos['resultado'] == 1) {
                Swal.fire
                ({
                  title: '',
                  text: 'PRODUCTO MODIFICADO',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
                  location.reload();
                })
              }
              else {
                Swal.fire
                ({
                  title: '',
                  text: 'PRODUCTO NO MODIFICADO',
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

  eliminarProducto(id)
  {
    this.tiendaService.eliminarProducto(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PRODUCTO ACTUALIZADO',
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
            text: 'PRODUCTO NO ACTUALIZADO',
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

  eliminarProducto2(id)
  {
    this.tiendaService.eliminarProducto2(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PRODUCTO ACTUALIZADO',
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
            text: 'PRODUCTO NO ACTUALIZADO',
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

  eliminarProductoPerma(id)
  {
    this.tiendaService.eliminarProductoPerma(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PRODUCTO ELIMINADO',
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
            text: 'PRODUCTO NO ELIMINADO',
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

  agregarProducto() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      if (this.loginForm.status != 'INVALID')
      {
        this.producto.titulo = this.loginForm.value.titulo;
        this.producto.descripcion = this.loginForm.value.descripcion;
        this.producto.foto = this.archivo.nombreArchivo;
        this.producto.precio = this.loginForm.value.precio;
        this.tiendaService.agregarProducto(this.producto).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'PRODUCTO REGISTRADO',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado => {
                this.subirFoto();
              })
            }
            else if (datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'EL PRODUCTO YA EXISTE',
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
                text: 'PRODUCTO NO REGISTRADO',
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

  seleccionarArchivo(event) 
  {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) 
    {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) 
  {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
}