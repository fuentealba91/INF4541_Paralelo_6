import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './Perfil/perfil.component';
import { PersonaComponent } from './Persona/persona.component';
import { RolComponent } from './Rol/rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoReunionComponent } from './Tipo-Reunion/tipo-reunion.component';
import { MantenedorContactoComponent } from './mantenedor-contacto/mantenedor-contacto.component';
import { ReunionComponent } from './reunion/reunion.component';
import { MenuPrincipalComponent } from './Menu-Principal/menu-principal/menu-principal.component';
import { RouterModule } from '@angular/router';
import { DeporteComponent } from './deporte/deporte/deporte.component';
import { AsignacionRolComponent } from './Asignacion-Roles/asignacion-rol/asignacion-rol.component';
import { EventoDeportivoComponent } from './evento-deportivo/evento-deportivo.component';
import { MenuRolComponent } from './Menu-Rol/menu-rol.component';
// import { MenuReunionComponent } from './menu-reunion/menu-reunion.component';
import { SidebarComponent } from 'src/app/Componentes/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuDeporteComponent } from './menu-deporte/menu-deporte.component';
import { CategoriaComponent } from './categoria/categoria.component';
// import { MenuDeportistaComponent } from './menu-deportista/menu-deportista.component';
import { GestorSolicitudesComponent } from './gestor-solicitudes/gestor-solicitudes.component';
import { MiDeporteComponent } from './Mi-Deporte/mi-deporte.component';
import { GestorDeportistasComponent } from './gestor-deportistas/gestor-deportistas.component';
import { FiltroDeportistasPipe } from './filtro-deportistas.pipe';
import { FiltroCategoriaPipe } from './filtro-categoria.pipe';
import { MenuSociosComponent } from './menu-socios/menu-socios.component';
import { FiltradoEstadoPipe } from './filtrado-estado.pipe';
import { TipoActividadComponent } from './tipo-actividad/tipo-actividad.component';
// import { MenuEventoDeportivoComponent } from './menu-evento-deportivo/menu-evento-deportivo.component';
import { MantenedorDirectivaComponent } from './mantenedor-directiva/mantenedor-directiva.component';
import { GestorSociosComponent } from './gestor-socios/gestor-socios.component';
// import { MenuNoticiaComponent } from './menu-noticia/menu-noticia.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { MenuTiendaComponent } from './menu-tienda/menu-tienda.component';
import { TipoRolPipe } from './tipo-rol.pipe';
import { GaleriaComponent } from './galeria/galeria.component';
import { FotosComponent } from './fotos/fotos.component';

@NgModule({
  declarations: 
  [
    PerfilComponent, 
      PersonaComponent,
      RolComponent,
      TipoReunionComponent,
      MantenedorContactoComponent,
      ReunionComponent,
      MenuPrincipalComponent,
      DeporteComponent,
      AsignacionRolComponent,
      EventoDeportivoComponent,
      MenuRolComponent,
      // MenuReunionComponent,
      SidebarComponent,
      MenuDeporteComponent,
      CategoriaComponent,
      // MenuDeportistaComponent,
      GestorSolicitudesComponent,
      MiDeporteComponent,
      GestorDeportistasComponent,
      FiltroDeportistasPipe,
      FiltroCategoriaPipe,
      MenuSociosComponent,
      FiltradoEstadoPipe,
      TipoActividadComponent,
      // MenuEventoDeportivoComponent,
      MantenedorDirectivaComponent,
      GestorSociosComponent,
      // MenuNoticiaComponent,
      NoticiaComponent,
      MenuTiendaComponent,
      TipoRolPipe,
      GaleriaComponent,
      FotosComponent
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  exports: 
  [
    PerfilComponent
  ]
})
export class MiembrosModule { }
