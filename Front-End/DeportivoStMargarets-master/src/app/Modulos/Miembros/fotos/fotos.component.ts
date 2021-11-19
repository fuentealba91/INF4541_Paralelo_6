import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Galeria } from 'src/app/Modulos/Modelos/galeria';
import Swal from 'sweetalert2';
import { Fotos } from '../../Modelos/fotos';
import { FotosService } from '../../Principal/fotos.service'
import { MultimediaService } from '../../Principal/multimedia.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  persona = null;
  foto = new Fotos();
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  galerias = null;
  det = null;
  fotos = null;
  loginForm!: FormGroup;
  modificarForm!: FormGroup;
  ima = null;
  submitted:boolean = false;
  perfil = null;

  archivo = 
  {
    nombre: "",
    nombreArchivo: "",
    base64textString: ""
  }

  constructor(private router: Router, private personaService: PersonaService, private fotosService: FotosService, private formBuilder: FormBuilder, private multimediaService: MultimediaService) {
    this.loginForm = this.formBuilder.group({
      foto: new FormControl(''),
      galeria: new FormControl('',Validators.required),
    });

    this.modificarForm = this.formBuilder.group({
      foto: new FormControl(''),
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

    this.listarGalerias();
    this.listarFotos();
    this.listarPerfil();
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.perfil = datos
      );
    
  }

  listarFotos()
  {
    this.fotosService.listarFotos().subscribe
      (
        (datos: any) => 
        {
          if(datos)
          {
            this.fotos = datos
          } 
        }
    );
  }

  listarGalerias()
  {
    this.multimediaService.listarGalerias().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          this.galerias = datos
        }
      }
    );
  }

  detalleFotoId(iden)
  {
    this.fotosService.detalleFoto(iden).subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          this.ima = datos
        }
      }
    );
  }

  agregarFoto() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      console.log("sdfsdf");
      if (this.loginForm.status != 'INVALID')
      {
        this.foto.foto = this.archivo.nombreArchivo;
        this.foto.id_galeria = this.loginForm.value.galeria;
        this.fotosService.agregarFoto(this.foto).subscribe
        (
          datos =>
          {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'FOTO AGREGADA',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado => {
                // 
                this.subirFoto();
              })
            }
            else if (datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'LA FOTO YA EXISTE',
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
                text: 'FOTO NO AGREGADA',
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

  subirFoto()
  {
    this.fotosService.subirFoto(this.archivo).subscribe
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
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ARCHIVO NO SUBIDO',
            icon: 'error',
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

  modificarFoto()
  {
    console.log(this.ima);
    var modificado = new Fotos();

    modificado.foto = this.archivo.nombreArchivo;
    modificado.id_galeria = this.ima![0][2];
    modificado.id = this.ima![0][0];

    // console.log("MODIFICADO ", modificado);

    if(this.modificarForm.status != "INVALID")
    {
      this.fotosService.modificarFoto(modificado).subscribe
      (
        datos =>
        {
          if(datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title:'',
              text: 'FOTO ACTUALIZADA',
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
              text: 'LA FOTO YA EXISTE',
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
              text: 'FOTO NO ACTUALIZADA',
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

  eliminarFoto(id)
  {
    this.fotosService.eliminarFoto(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'FOTO ELIMINADA',
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
            text: 'FOTO NO ELIMINADA',
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
