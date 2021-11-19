import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaService } from '../../Miembros/persona.service';
import { Persona } from '../../Modelos/persona';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  persona = new Persona();
  loginForm!: FormGroup;
  submitted:boolean = false;
  sitekey: string = '';
  flag: boolean = false;

  constructor(private _renderer: Renderer2, private personaService: PersonaService, private router: Router, private formBuilder: FormBuilder)
  {
    // this.mostrarFoto();
  }

  ngOnInit(): void 
  {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])
      
      // recaptcha: new FormControl([null, Validators.required])
    })

    let script = this._renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._renderer.appendChild(document.body, script);

    this.sitekey  = '6LdItKkbAAAAANzToTmqvTG0eNbHKQC00ZYUVQh2';
  }

  resolved(token)
  {
    let respuesta = null;
    respuesta = token;
    console.log("HOLA", respuesta);
    if (respuesta != null)
    {
      this.flag = true;
    }
    else
    {
      this.flag = false;
    }
  }

  // mostrarFoto()
  // {
  //   localStorage.setItem("correo", (<HTMLInputElement>document.getElementById("correo")).value);

  //   this.personaService.fotoPerfil(localStorage.getItem("correo")).subscribe
  //   (
  //     (datos: any) => {
  //       this.persona = datos,
  //       console.log(this.persona)
  //     }
  //   );
  // }

  Ingresar()
  {
    this.submitted = true;
    if(this.loginForm.invalid && this.flag == false){
      return;
    }
    else 
    {
      if(this.loginForm.status != 'INVALID' && this.flag == true)
      {
        this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
        this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;
        
        this.personaService.iniciarSesion(this.persona).subscribe
          (
            datos => {
              sessionStorage.setItem("id", datos[0][0]);
              console.log(sessionStorage.getItem("id"));
              const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
              this.router.navigate([redirect]);
            },
            error =>
              Swal.fire
              ({
                title: '',
                text: 'CORREO Y/O CONTRASEÑA INCORRECTOS',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
          );
      }
    }
    
  }

}
