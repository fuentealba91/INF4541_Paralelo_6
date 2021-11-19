import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format, validate } from 'rut.js';
import Swal from 'sweetalert2';
import { Persona } from '../../Modelos/persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det:any[] = [];
  modificada = new Persona();
  perfil = null;
  submitted:boolean = false;
  loginForm!: FormGroup;
  rutValidated = true;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  rolSecreDir = sessionStorage.getItem("rolSecreDir") || null;

  constructor(private router: Router, private personaService: PersonaService, private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      // apodo: new FormControl('', [Validators.required]),
      rut: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      segundo: new FormControl(''),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('',[Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      // tEmergencia: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      comuna: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      sexo: new FormControl('',[Validators.required]),
      // password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      password: new FormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      confirm_password: new FormControl('', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      // confirm_password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      preguntaSecreta: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void 
  {
    this.listarPersona();
    // this.validarCampos();
    
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
  }

  formatRut()
  {
    this.rutValidated = validate(this.loginForm.value.rut);
    let rut = format(this.loginForm.value.rut);
    this.loginForm.patchValue({ rut });

    return this.rutValidated;
  }

  compararClaves()
  {
    if (this.loginForm.value.password != this.loginForm.value.confirm_password)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  // validarCampos()
  // {
  //   (function () 
  //   {
  //     'use strict'
    
  //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
  //     var forms = document.querySelectorAll('.needs-validation')
    
  //     // Loop over them and prevent submission
  //     Array.prototype.slice.call(forms)
  //       .forEach(function (form) {
  //         form.addEventListener('submit', function (event) 
  //         {
  //           if (!form.checkValidity()) {
  //             event.preventDefault()
  //             event.stopPropagation()
  //           }
    
  //           form.classList.add('was-validated')
  //         }, false)
  //       })
  //   })()
  // }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.perfil = datos
      );
    
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  detallePersona(iden)
  {
    this.personaService.detallePersona(iden).subscribe
    (
        (datos: any) => 
        {
          console.log(datos);
          this.det = datos
          let primera = new Date(datos[0].f_nacimiento);
          // primera.setHours(primera.getHours() - 3);
          let dia = primera.toISOString();
          let fecha = dia.substring(0,dia.length - 14);
          console.log("FECHA ",fecha);
          this.loginForm.controls['id'].setValue(datos[0].id_Persona);
          // this.loginForm.controls['apodo'].setValue(datos[0].apodo);
          // this.loginForm.controls['fotoPerfil'].setValue(this.persona![0][2]);
          this.loginForm.controls['rut'].setValue(datos[0].rut);
          this.loginForm.controls['nombre'].setValue(datos[0].nombre);
          this.loginForm.controls['segundo'].setValue(datos[0].segundo_nombre);
          this.loginForm.controls['paterno'].setValue(datos[0].a_paterno);
          this.loginForm.controls['materno'].setValue(datos[0].a_materno);
          this.loginForm.controls['correo'].setValue(datos[0].correo);
          this.loginForm.controls['telefono'].setValue(datos[0].telefono);
          // this.loginForm.controls['tEmergencia'].setValue(datos[0].tel_emergencia);
          this.loginForm.controls['nacimiento'].setValue(fecha);
          this.loginForm.controls['comuna'].setValue(datos[0].comuna);
          this.loginForm.controls['direccion'].setValue(datos[0].direccion);
          this.loginForm.controls['sexo'].setValue(datos[0].sexo);
          this.loginForm.controls['preguntaSecreta'].setValue(datos[0].pregunta_secreta);
        }
    );
  }

  validarPersona()
  {
    if (this.persona.rut != null && this.persona.rut != '' && this.persona.rut != undefined)
    {
      if (this.persona.nombre != null && this.persona.nombre != '' && this.persona.nombre != undefined)
      {
        if (this.persona.aPaterno != null && this.persona.aPaterno != '' && this.persona.aPaterno != undefined)
        {
          if (this.persona.aMaterno != null && this.persona.aMaterno != '' && this.persona.aMaterno != undefined)
          {
            if (this.persona.correo != null && this.persona.correo != '' && this.persona.correo != undefined)
            {
              if (this.persona.telefono != null && this.persona.telefono != '' && this.persona.telefono != undefined)
              {
                if (this.persona.tEmergencia != null && this.persona.tEmergencia != '' && this.persona.tEmergencia != undefined)
                {
                  if (this.persona.fNacimiento != null && this.persona.fNacimiento != undefined)
                  {
                    if (this.persona.comuna != null && this.persona.comuna != '' && this.persona.comuna != undefined)
                    {
                      if (this.persona.direccion != null && this.persona.direccion != '' && this.persona.direccion != undefined)
                      {
                        if (this.persona.sexo != null && this.persona.sexo != '' && this.persona.sexo != undefined)
                        {
                          return true;
                        }
                        else
                        {
                          return false;
                        }
                      }
                      else
                      {
                        return false;
                      }
                    }
                    else
                    {
                      return false;
                    }
                  }
                  else
                  {
                    return false;
                  }
                }
                else
                {
                  return false;
                }
              }
              else
              {
                return false;
              }
            }
            else
            {
              return false;
            }
          }
          else
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  agregarPersona()
  {
    if (this.validarPersona() == true)
    {
      this.personaService.agregarPersona(this.persona).subscribe
      (
        datos =>
        {
          if (datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'PERSONA AGREGADA',
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
              text: 'PERSONA NO AGREGADA',
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
        text: 'DEBE LLENAR LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }

  eliminarPersona(id)
  {
    this.personaService.eliminarPersona(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA ELIMINADA',
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
            text: 'PERSONA NO ELIMINADA',
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

  editarPersona()
  {
    console.log(this.loginForm.status);
    this.submitted = true;

    if(this.loginForm.status != "INVALID")
    {
      let modificado = new Persona();
      modificado.id = this.det[0].id_Persona;
      modificado.rut = this.loginForm.value.rut;
      // modificado.apodo = this.loginForm.value.apodo;
      modificado.nombre = this.loginForm.value.nombre;
      modificado.sNombre = this.loginForm.value.segundo;
      modificado.aPaterno = this.loginForm.value.paterno;
      modificado.aMaterno = this.loginForm.value.materno;
      modificado.correo = this.loginForm.value.correo;
      modificado.telefono = this.loginForm.value.telefono;
      modificado.fNacimiento = this.loginForm.value.nacimiento;
      modificado.comuna = this.loginForm.value.comuna;
      modificado.direccion = this.loginForm.value.direccion;
      modificado.sexo = this.loginForm.value.sexo;
      modificado.clave = this.loginForm.value.password;
      modificado.preguntaSecreta = this.loginForm.value.preguntaSecreta;

      console.log(modificado);

      this.personaService.editarPersonaSecretaria(modificado).subscribe
      (
        datos =>
        {
          console.log(datos);
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'PERSONA MODIFICADA',
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
              text: 'PERSONA NO MODIFICADA',
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

  // editarPersona()
  // {
    // var ide = (<HTMLInputElement>document.getElementById("mId")).value;
    // var rut = (<HTMLInputElement>document.getElementById("mRut")).value;
    // var nom = (<HTMLInputElement>document.getElementById("mNombre")).value;
    // var pat = (<HTMLInputElement>document.getElementById("mPaterno")).value;
    // var mat = (<HTMLInputElement>document.getElementById("mMaterno")).value;
    // var cor = (<HTMLInputElement>document.getElementById("mCorreo")).value;
    // var tel = (<HTMLInputElement>document.getElementById("mTelefono")).value;
    // var eme = (<HTMLInputElement>document.getElementById("mEmergencia")).value;
    // var nac = (<HTMLInputElement>document.getElementById("mNacimiento")).value;
    // var com = (<HTMLInputElement>document.getElementById("mComuna")).value;
    // var dir = (<HTMLInputElement>document.getElementById("mDireccion")).value;
    // // var sex = 'F';
    // var sex = (<HTMLInputElement>document.getElementById("mSexo")).value;


    // if((ide!="")&&(rut!="")&&(nom!="")&&(pat!="")&&(mat!="")&&(cor!="")&&(tel!="")&&(eme!="")&&(nac!="")&&(com!="")&&(dir!="")&&(sex!=""))
    // {
    //   this.personaService.editarPersona(ide, rut, nom, pat, mat, cor, tel, eme, nac, com, dir, sex).subscribe
    //   (
    //     datos =>
    //     {
    //       if (datos['resultado'] == 1)
    //       {
    //         Swal.fire
    //         ({
    //           title: '',
    //           text: 'PERSONA MODIFICADA',
    //           icon: 'success',
    //           confirmButtonText: 'Aceptar',
    //           showConfirmButton: true
    //         })
    //         .then(resultado =>
    //         {
    //           location.reload();
    //         })
    //       }
    //       else if (datos['resultado'] == 2)
    //       {
    //         Swal.fire
    //         ({
    //           title: '',
    //           text: 'RUT Y/O CORREO YA EXISTEN',
    //           icon: 'error',
    //           confirmButtonText: 'Aceptar',
    //           showConfirmButton: true
    //         })
    //         .then(resultado =>
    //         {
    //           location.reload();
    //         })
    //       }
    //       else
    //       {
    //         Swal.fire
    //         ({
    //           title: '',
    //           text: 'PERSONA NO MODIFICADA',
    //           icon: 'error',
    //           confirmButtonText: 'Aceptar',
    //           showConfirmButton: true
    //         })
    //         .then(resultado =>
    //         {
    //           location.reload();
    //         })
    //       }
    //     }
    //   )
    // }
    // else
    // {
    //   Swal.fire
    //   ({
    //     title: '',
    //     text: 'DEBE LLENAR TODOS LOS CAMPOS',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar',
    //     showConfirmButton: true
    //   })
    //   .then(resultado =>
    //   {
    //     location.reload();
    //   })
    // }
  // }
}
