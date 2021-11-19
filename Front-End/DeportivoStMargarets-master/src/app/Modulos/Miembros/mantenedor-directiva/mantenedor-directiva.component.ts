import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Directiva } from '../../Modelos/directiva';
import { DirectivaService } from '../directiva.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-mantenedor-directiva',
  templateUrl: './mantenedor-directiva.component.html',
  styleUrls: ['./mantenedor-directiva.component.css']
})
export class MantenedorDirectivaComponent implements OnInit {

  persona = null;
  loginForm!: FormGroup;
  submitted: boolean = false;
  directivas: any[] = [];
  miembros: any[] = [];
  date: Date = new Date();
  flag: boolean = false;
  directiva = new Directiva();

  constructor(private router: Router, private directivaService: DirectivaService, private personaService: PersonaService, private formBuilder: FormBuilder,) 
  {
    this.loginForm = this.formBuilder.group({
      perJuridica: new FormControl('',Validators.required),
      presidente: new FormControl('',Validators.required),
      secretario: new FormControl('',Validators.required),
      tesorero: new FormControl('',Validators.required),
      directivo: new FormControl('',Validators.required),
      dirDesignado: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {

    if(sessionStorage.getItem("menor") != null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
    this.listarPersona();
    this.listarDirectivas();
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

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          for(let i=0; i<datos.length;i++)
          {
            this.miembros = datos
          }
        }
      }
    );
  }

  validarEdad()
  {
    // let nacimiento = new Date(this.agregarForm.value.nacimiento);
    // let dif = (((this.date.getTime() - nacimiento.getTime())/86400000)/6576);

    // if(dif < 1)
    // {
    //   return true;
    // }
    // else
    // {
    //   return false;
    // }
  }

  listarDirectivas()
  {
    this.directivaService.listarDirectivas().subscribe
    (
      (datos:any) => {this.directivas = datos, console.log(datos)}
    )
  }

  crearDirectiva()
  {
    this.submitted = true;
    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      if(this.loginForm.status != 'INVALID')
      {
        let fecha = new Date(this.loginForm.value.perJuridica);

        if(fecha > this.date)
        {
          this.flag = false;

          this.directiva.perJuridica = this.loginForm.value.perJuridica;
          this.directiva.presidente = this.loginForm.value.presidente;
          this.directiva.secretario = this.loginForm.value.secretario;
          this.directiva.tesorero = this.loginForm.value.tesorero;
          this.directiva.directivo = this.loginForm.value.directivo;
          this.directiva.dirDesignado = this.loginForm.value.dirDesignado;

          console.log(this.directiva);
        }
        else
        {
          this.flag = true;
        }
      }
    }
  }
}
