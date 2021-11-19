import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import Swal from 'sweetalert2';
import { PersonaService } from '../../Miembros/persona.service';
import { Persona } from '../../Modelos/persona';
import { validate, clean, format, getCheckDigit } from 'rut.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det = null;
  loginForm!: FormGroup;
  rutValidated = true;
  date: Date = new Date();
  submitted:boolean = false;

  constructor(private router: Router, private personaService: PersonaService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
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
      // password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      confirm_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      // confirm_password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      preguntaSecreta: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  formatRut()
  {
    this.rutValidated = validate(this.loginForm.value.rut);
    let rut = format(this.loginForm.value.rut);
    this.loginForm.patchValue({ rut });

    return this.rutValidated;
  }

  validarEdad()
  {
    let nacimiento = new Date(this.loginForm.value.nacimiento);
    let dif = (((this.date.getTime() - nacimiento.getTime())/86400000)/6576);

    if(dif >= 1)
    {
      return true;
    }
    else
    {
      return false;
    }
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

  Enviar(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
  }

  agregarPersona()
  {
    this.submitted = true;
    if(this.loginForm.invalid)
    {
      return;
    }
    else 
    {
      if (this.loginForm.status != "INVALID")
      {
        if(this.validarEdad())
        {
          if(this.rutValidated)
          {
            if(this.compararClaves() == true)
            {
              this.persona.rut = this.loginForm.value.rut;
              this.persona.nombre = this.loginForm.value.nombre;
              this.persona.sNombre = this.loginForm.value.segundo;
              this.persona.aPaterno = this.loginForm.value.paterno;
              this.persona.aMaterno = this.loginForm.value.materno;
              this.persona.correo = this.loginForm.value.correo;
              this.persona.telefono = this.loginForm.value.telefono;
              this.persona.fNacimiento = this.loginForm.value.nacimiento;
              this.persona.comuna = this.loginForm.value.comuna;
              this.persona.direccion = this.loginForm.value.direccion;
              this.persona.sexo = this.loginForm.value.sexo;
              this.persona.clave = this.loginForm.value.password;
              this.persona.preguntaSecreta = this.loginForm.value.preguntaSecreta;
              
              console.log(this.persona);
              this.personaService.agregarPersona(this.persona).subscribe
              (
                datos =>
                {
                  if(datos['respuesta'] == 1)
                  {
                    Swal.fire
                    ({
                      title: '',
                      text: 'REGISTRO EXITOSO',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      showConfirmButton: true
                    })
                    .then(resultado =>
                    {
                      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
                      this.router.navigate([redirect]);
                    })
                  }
                  else 
                  {
                    Swal.fire
                    ({
                      title: '',
                      text: 'YA EXISTE UNA CUENTA VINCULADA A ESTE CORREO',
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
            text: 'DEBE SER MAYOR DE EDAD PARA REGISTRARSE',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      }
    }
  }
}