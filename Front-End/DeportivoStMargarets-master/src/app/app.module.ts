import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { MatSidenavModule } from '@angular/material/sidenav'
// import { MatIconModule } from '@angular/material/icon'
// import { MatListModule } from '@angular/material/list'
// import { MatButtonModule } from '@angular/material/button'

import { FooterComponent } from './Componentes/footer/footer.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { MiembrosModule } from './Modulos/Miembros/miembros.module';
import { PrincipalModule } from './Modulos/Principal/principal.module';
import { ReactiveFormsModule } from '@angular/forms' 
import { NgxCaptchaModule } from 'ngx-captcha';
// import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    // SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    MiembrosModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    Ng2SearchPipeModule
    // FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
