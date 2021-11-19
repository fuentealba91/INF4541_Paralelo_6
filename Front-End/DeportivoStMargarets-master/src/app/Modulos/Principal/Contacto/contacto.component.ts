import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../contacto.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit 
{

  contacto = new Contacto();
  loginForm!: FormGroup;
  submitted:boolean = false;

  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required, Validators.pattern("[0-9]{9}")]),
      asunto: new FormControl('',Validators.required),
      mensaje: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void 
  {
  }

  Enviar(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else 
    {
      if(this.loginForm.status != 'INVALID')
      {
        this.contacto.nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
        this.contacto.correo = (<HTMLInputElement>document.getElementById("correo")).value;
        this.contacto.telefono = parseInt((<HTMLInputElement>document.getElementById("telefono")).value);
        this.contacto.asunto = (<HTMLInputElement>document.getElementById("asunto")).value;
        this.contacto.mensaje = (<HTMLInputElement>document.getElementById("mensaje")).value;
        console.log(this.contacto);
        this.contactoService.EnviarMensaje(this.contacto).subscribe
        (
          datos =>
          {
            if(datos['respuesta'] == 1){
              Swal.fire
              ({
                title: '',
                text: 'MENSAJE ENVIADO',
                icon: 'success',
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
  }
}