import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format, validate } from 'rut.js';
import Swal from 'sweetalert2';
import { Persona } from '../../Modelos/persona';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  apoderado = null;
  listaRepresentado = null;
  representado = new Persona();
  persona = null;
  editado = new Persona();
  loginForm!: FormGroup;
  agregarForm!: FormGroup;
  url = "";
  rutValidated:boolean = true;
  rutValidated2:boolean = true;
  submitted:boolean = false;
  date: Date = new Date();
  flag:boolean = true;
  rolAdmin = null;
  rolSecretario = null;
  rolEntrenador = null;
  rolInterno = null;
  rolExterno = null;
  rolDeportista = null;
  rolMiembro = null;
  rolPresidente = null;
  rolTesorero = null;
  rolSecDir = null;
  rolDir = null;
  rolDes = null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;
  menor = sessionStorage.getItem("menor") || null;

  archivo = 
  {
    nombre: "",
    nombreArchivo: "",
    base64textString: ""
  }

  constructor(private rolService: RolService, private router: Router, private personaService: PersonaService, private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group({
      id: new FormControl(''),
      apodo: new FormControl(''),
      fotoPerfil: new FormControl(''),
      rut: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      segundo: new FormControl(''),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('',[Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      tEmergencia: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      comuna: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      // sexo: new FormControl('',[Validators.required]),
    });

    this.agregarForm = this.formBuilder.group({
      rut: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      segundo: new FormControl(''),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('',[Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      comuna: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      sexo: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      confirm_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      preguntaSecreta: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }
    
    this.listarPerfil();
    this.listarRepresentados();
    this.listarRolesValidacion();
    // this.detalleApoderado();
  }

  listarRolesValidacion()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        // console.log(datos);
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
              if(datos[i].id_rol == 2)
              {
                this.rolInterno = datos[i];
              }
              if(datos[i].id_rol == 3)
              {
                this.rolExterno = datos[i];
              }
              if(datos[i].id_rol == 16)
              {
                this.rolEntrenador = datos[i];
              }
              if(datos[i].id_rol == 4)
              {
                this.rolSecretario = datos[i];
              }
              if(datos[i].id_rol == 5)
              {
                this.rolDeportista = datos[i];
              }
              if(datos[i].id_rol == 6)
              {
                this.rolMiembro = datos[i];
              }
            }
          }
        }
        console.log(this.rolAdmin);
      }
    )
  }

  compararClaves()
  {
    if (this.agregarForm.value.password != this.agregarForm.value.confirm_password)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  detalleApoderado()
  {
    let id = this.persona![0][17];
    this.personaService.detallePersona(id).subscribe(
      (datos: any) => {
        this.apoderado = datos
      }
    )
  }

  listarRepresentados()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.listarRepresentados(id).subscribe
    (
      (datos: any) => {
        this.listaRepresentado = datos
      }
    )
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos,
        this.detalleApoderado();
      }
    );
  }

  validarEdad()
  {
    let nacimiento = new Date(this.agregarForm.value.nacimiento);
    let dif = (((this.date.getTime() - nacimiento.getTime())/86400000)/6576);

    if(dif < 1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  formatRut()
  {
    this.rutValidated = validate(this.loginForm.value.rut);
    console.log(this.rutValidated);
    let rut = format(this.loginForm.value.rut);
    this.loginForm.patchValue({ rut });

    return this.rutValidated;
  }

  formatRut2()
  {
    this.rutValidated2 = validate(this.agregarForm.value.rut);
    console.log(this.rutValidated2);
    let rut = format(this.agregarForm.value.rut);
    this.agregarForm.patchValue({ rut });

    return this.rutValidated2;
  }

  detallePersona()
  {
    this.loginForm.controls['id'].setValue(this.persona![0][0]);
    this.loginForm.controls['apodo'].setValue(this.persona![0][1]);
    // this.loginForm.controls['fotoPerfil'].setValue(this.persona![0][2]);
    this.loginForm.controls['rut'].setValue(this.persona![0][3]);
    this.loginForm.controls['nombre'].setValue(this.persona![0][4]);
    this.loginForm.controls['segundo'].setValue(this.persona![0][5]);
    this.loginForm.controls['paterno'].setValue(this.persona![0][6]);
    this.loginForm.controls['materno'].setValue(this.persona![0][7]);
    this.loginForm.controls['correo'].setValue(this.persona![0][8]);
    this.loginForm.controls['telefono'].setValue(this.persona![0][11]);
    this.loginForm.controls['tEmergencia'].setValue(this.persona![0][15]);
    this.loginForm.controls['nacimiento'].setValue(this.persona![0][11]);
    this.loginForm.controls['comuna'].setValue(this.persona![0][13]);
    this.loginForm.controls['direccion'].setValue(this.persona![0][14]);
    // this.loginForm.controls['sexo'].setValue(this.persona![0][16]);
  }

  agregarRepresentado()
  {
    this.submitted = true;

    if(this.agregarForm.status != "INVALID")
    {
      if(this.validarEdad())
      {
        if(this.rutValidated2)
        {
          if(this.compararClaves())
          {
            this.representado.rut = this.agregarForm.value.rut;
            this.representado.nombre = this.agregarForm.value.nombre;
            this.representado.sNombre = this.agregarForm.value.segundo;
            this.representado.aPaterno = this.agregarForm.value.paterno;
            this.representado.aMaterno = this.agregarForm.value.materno;
            this.representado.correo = this.agregarForm.value.correo;
            this.representado.telefono = this.agregarForm.value.telefono;
            this.representado.fNacimiento = this.agregarForm.value.nacimiento;
            this.representado.comuna = this.agregarForm.value.comuna;
            this.representado.direccion = this.agregarForm.value.direccion;
            this.representado.sexo = this.agregarForm.value.sexo;
            this.representado.clave = this.agregarForm.value.password;
            this.representado.preguntaSecreta = this.agregarForm.value.preguntaSecreta;
            this.representado.idApoderado = this.persona![0][0];

            console.log(this.representado);

            this.personaService.agregarRepresentado(this.representado).subscribe(
              datos => {
                if(datos['respuesta'] == 1)
                {
                  Swal.fire
                  ({
                    title: '',
                    text: 'REPRESENTADO AGREGADO',
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
                    text: 'REPRESENTADO NO AGREGADO',
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
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'LAS CONTRASEÑAS DEBEN SER IGUALES',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
          }
        }
      }
      else
      {
        Swal.fire
        ({
          title: '',
          text: 'REPRESENTADO NO PUEDE SER MAYOR DE EDAD',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          showConfirmButton: true
        })
      }
    }
  }

  editarPerfil()
  {
    this.submitted = true;
    if (this.loginForm.status != "INVALID")
    {
      if(this.rutValidated)
      {
        if (this.archivo.nombreArchivo != "")
        {
          console.log(this.archivo);
          this.personaService.subirFoto(this.archivo).subscribe(
            datos => {
              if (datos == 1)
              {
                this.editado.id = this.loginForm.value.id;
                this.editado.apodo = this.loginForm.value.apodo;
                // this.editado.foto = this.archivo.nombreArchivo;
                this.editado.foto = this.archivo.nombreArchivo;
                this.editado.rut = this.loginForm.value.rut;
                this.editado.nombre = this.loginForm.value.nombre;
                this.editado.sNombre = this.loginForm.value.segundo;
                this.editado.aPaterno = this.loginForm.value.paterno;
                this.editado.aMaterno = this.loginForm.value.materno;
                this.editado.correo = this.loginForm.value.correo;
                this.editado.telefono = this.loginForm.value.telefono;
                this.editado.tEmergencia = this.loginForm.value.tEmergencia;
                this.editado.fNacimiento = this.loginForm.value.nacimiento;
                this.editado.comuna = this.loginForm.value.comuna;
                this.editado.direccion = this.loginForm.value.direccion;
                // this.editado.sexo = this.loginForm.value.sexo;

                console.log(this.editado);

                this.personaService.editarPersona(this.editado).subscribe(
                  datos => {
                    if (datos['resultado'] == 1) {
                      Swal.fire
                      ({
                        title: '',
                        text: 'PERFIL MODIFICADO',
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
                        text: 'PERFIL NO MODIFICADO',
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
          this.editado.apodo = this.loginForm.value.apodo;
          this.editado.foto = this.archivo.nombreArchivo;
          this.editado.rut = this.loginForm.value.rut;
          this.editado.nombre = this.loginForm.value.nombre;
          this.editado.sNombre = this.loginForm.value.segundo;
          this.editado.aPaterno = this.loginForm.value.paterno;
          this.editado.aMaterno = this.loginForm.value.materno;
          this.editado.correo = this.loginForm.value.correo;
          this.editado.telefono = this.loginForm.value.telefono;
          this.editado.tEmergencia = this.loginForm.value.tEmergencia;
          this.editado.fNacimiento = this.loginForm.value.nacimiento;
          this.editado.comuna = this.loginForm.value.comuna;
          this.editado.direccion = this.loginForm.value.direccion;
          // this.editado.sexo = this.loginForm.value.sexo;

          console.log(this.editado);

          this.personaService.editarPersona(this.editado).subscribe(
            datos => {
              if (datos['resultado'] == 1) {
                Swal.fire
                ({
                  title: '',
                  text: 'PERFIL MODIFICADO',
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
                  text: 'PERFIL NO MODIFICADO',
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
