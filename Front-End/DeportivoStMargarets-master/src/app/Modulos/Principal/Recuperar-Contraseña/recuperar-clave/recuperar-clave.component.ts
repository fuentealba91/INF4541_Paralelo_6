import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PersonaService } from 'src/app/Modulos/Miembros/persona.service';
import { Persona } from 'src/app/Modulos/Modelos/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det: any;
  formulario!: FormGroup
  loginForm!: FormGroup
  submitted: boolean = false;
  submitted2: boolean = false;
  sitekey: string;
  flag: boolean = false;
  bandera: boolean = false;
  
  constructor(private _renderer: Renderer2, private personaService: PersonaService, private router: Router, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      preguntaSecreta: new FormControl('',[Validators.required]),
    });
    
    this.loginForm = this.formBuilder.group({
      // correo: new FormControl('', [Validators.required, Validators.email]),
      // preguntaSecreta: new FormControl('',[Validators.required]),
      // password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      confirm_password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      // confirm_password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      recaptcha: new FormControl(['', Validators.required]),
    });

    this.sitekey = '6LdItKkbAAAAANzToTmqvTG0eNbHKQC00ZYUVQh2';
  }

  ngOnInit(): void
  {
    let script = this._renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._renderer.appendChild(document.body, script);
  }

  resolved(token)
  {
    let respuesta = null;
    respuesta = token;
    console.log(respuesta);
    if (respuesta != null)
    {
      this.flag = true;
    }
    else
    {
      this.flag = false;
    }
  }

  // validarClaves()
  // {
  //   if(this.persona.clave == this.det)
  //   {
  //     return true;
  //   }
  //   else
  //   {
  //     return false;
  //   }
  // }

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

  validarRespuesta() {
    this.submitted2 = true;
    if (this.formulario.invalid)
    {
      return;
    }
    else
    {
      this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
      this.persona.preguntaSecreta = (<HTMLInputElement>document.getElementById("pregunta")).value;

      this.personaService.validarRespuesta(this.persona).subscribe(datos =>
      {
        if (datos['respuesta'] == 1)
        {
          this.bandera = true;
          console.log(this.bandera);
        }
        else if (datos['respuesta'] == 2)
        {
          Swal.fire
          ({
            title: '',
            text: 'RESPUESTA NO VÁLIDA',
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
            text: 'CORREO NO REGISTRADO',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      })
    }
  }

  cambiarClave()
  {
    this.submitted = true;
    if (this.loginForm.invalid && this.flag == false) {
      return;
    }
    else {
      if (this.loginForm.status != 'INVALID' && this.flag == true)
      {
        if (this.compararClaves())
        {
          this.persona.correo = this.formulario.value.correo;
      this.persona.preguntaSecreta = this.formulario.value.preguntaSecreta;
          this.persona.clave = this.loginForm.value.password;

          console.log(this.persona);
          this.personaService.cambiarClave(this.persona).subscribe
          (datos => {
            if (datos['respuesta'] == 1)
            {
              Swal.fire
              ({
                title: '',
                text: 'CONTRASEÑA MODIFICADA',
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
            else if(datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'EL CORREO NO SE ENCUENTRA REGISTRADO',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
            else if(datos['respuesta'] == 3)
            {
              Swal.fire
              ({
                title: '',
                text: 'LA RESPUESTA NO COINCIDE CON LA REGISTRADA',
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
                text: 'CONTRASEÑA NO MODIFICADA',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
          })
        }
      }
    }
  }
}
