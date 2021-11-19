import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './Inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoService } from './contacto.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Login/login.component';
import { RouterModule } from '@angular/router';
import { CarruselComponent } from './Carrusel/carrusel.component';
import { NoticiasEventosComponent } from './Noticias-Eventos/noticias-eventos.component';
import { RamasComponent } from './Ramas/ramas.component';
import { ContactoComponent } from './Contacto/contacto.component';
import { PatrocinadoresComponent } from './Patrocinadores/patrocinadores.component';
import { RegistroComponent } from './Registro/registro.component';
import { RecuperarClaveComponent } from './Recuperar-Contraseña/recuperar-clave/recuperar-clave.component';
import { MultimediaComponent } from './Multimedia/multimedia.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { NoticiasComponent } from './noticias/noticias.component';
import { TiendaComponent } from './tienda/tienda.component';
// import { GaleriaComponent } from './galeria/galeria.component';
import { GaleriasComponent } from './galerias/galerias.component';
@NgModule({
  declarations: 
  [
    InicioComponent, 
    LoginComponent, 
    CarruselComponent,
    NoticiasEventosComponent,
    RamasComponent,
    ContactoComponent,
    PatrocinadoresComponent,
    RegistroComponent,
    RecuperarClaveComponent,
    MultimediaComponent,
    DirectivaComponent,
    NoticiasComponent,
    TiendaComponent,
    // GaleriaComponent,
    GaleriasComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxCaptchaModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: 
  [
    ContactoService
  ],
  exports: 
  [
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    CarruselComponent,
    NoticiasEventosComponent,
    RamasComponent,
    ContactoComponent
  ]
})
export class PrincipalModule { }
