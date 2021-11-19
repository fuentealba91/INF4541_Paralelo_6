import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionRolComponent } from './Modulos/Miembros/Asignacion-Roles/asignacion-rol/asignacion-rol.component';
import { DeporteComponent } from './Modulos/Miembros/deporte/deporte/deporte.component';
import { EventoDeportivoComponent } from './Modulos/Miembros/evento-deportivo/evento-deportivo.component';
import { MantenedorContactoComponent } from './Modulos/Miembros/mantenedor-contacto/mantenedor-contacto.component';
import { MenuPrincipalComponent } from './Modulos/Miembros/Menu-Principal/menu-principal/menu-principal.component';
import { PerfilComponent } from './Modulos/Miembros/Perfil/perfil.component';
import { PersonaComponent } from './Modulos/Miembros/Persona/persona.component';
import { ReunionComponent } from './Modulos/Miembros/reunion/reunion.component';
import { RolComponent } from './Modulos/Miembros/Rol/rol.component';
import { TipoReunionComponent } from './Modulos/Miembros/Tipo-Reunion/tipo-reunion.component';
import { InicioComponent } from './Modulos/Principal/Inicio/inicio.component';
import { LoginComponent } from './Modulos/Principal/Login/login.component';
import { RecuperarClaveComponent } from './Modulos/Principal/Recuperar-Contraseña/recuperar-clave/recuperar-clave.component';
import { RegistroComponent } from './Modulos/Principal/Registro/registro.component';
import { CarruselComponent } from './Modulos/Principal/Carrusel/carrusel.component';
import { NoticiasEventosComponent } from './Modulos/Principal/Noticias-Eventos/noticias-eventos.component';
import { RamasComponent } from './Modulos/Principal/Ramas/ramas.component';
import { ContactoComponent } from './Modulos/Principal/Contacto/contacto.component';
import { MenuRolComponent } from './Modulos/Miembros/Menu-Rol/menu-rol.component';
// import { MenuReunionComponent } from './Modulos/Miembros/menu-reunion/menu-reunion.component';
import { MultimediaComponent } from './Modulos/Principal/Multimedia/multimedia.component';
// import { MantenedorDirectivaComponent } from './Modulos/Miembros/directiva/directiva.component'
import { MenuDeporteComponent } from './Modulos/Miembros/menu-deporte/menu-deporte.component';
import { CategoriaComponent } from './Modulos/Miembros/categoria/categoria.component';
// import { MenuDeportistaComponent } from './Modulos/Miembros/menu-deportista/menu-deportista.component';
import { GestorSolicitudesComponent } from './Modulos/Miembros/gestor-solicitudes/gestor-solicitudes.component';
import { MiDeporteComponent } from './Modulos/Miembros/Mi-Deporte/mi-deporte.component';
import { GestorDeportistasComponent } from './Modulos/Miembros/gestor-deportistas/gestor-deportistas.component';
import { MenuSociosComponent } from './Modulos/Miembros/menu-socios/menu-socios.component';
import { TipoActividadComponent } from './Modulos/Miembros/tipo-actividad/tipo-actividad.component';
// import { MenuEventoDeportivoComponent } from './Modulos/Miembros/menu-evento-deportivo/menu-evento-deportivo.component';
import { DirectivaComponent } from './Modulos/Principal/directiva/directiva.component';
import { MantenedorDirectivaComponent } from './Modulos/Miembros/mantenedor-directiva/mantenedor-directiva.component';
import { TiendaComponent } from './Modulos/Principal/tienda/tienda.component';
import { MenuTiendaComponent } from './Modulos/Miembros/menu-tienda/menu-tienda.component';
import { NoticiasComponent } from './Modulos/Principal/noticias/noticias.component';
import { GestorSociosComponent } from './Modulos/Miembros/gestor-socios/gestor-socios.component';
import { NoticiaComponent } from './Modulos/Miembros/noticia/noticia.component';
import { GaleriaComponent } from './Modulos/Miembros/galeria/galeria.component';
import { FotosComponent } from './Modulos/Miembros/fotos/fotos.component';
import { GaleriasComponent } from './Modulos/Principal/galerias/galerias.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  // { path: '#noticias', component: NoticiasEventosComponent },
  //{ path: 'ramasDepor', component: RamasComponent },
  // { path: '#cont', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'rol', component: RolComponent },
  { path: 'tipo-reunion', component: TipoReunionComponent },
  { path: 'mantenedor-contacto', component: MantenedorContactoComponent },
  { path: 'persona', component: PersonaComponent },
  { path: 'menu-principal', component: MenuPrincipalComponent },
  { path: 'recuperar-contraseña', component: RecuperarClaveComponent },
  { path: 'deporte', component: DeporteComponent },
  { path: 'asignar-rol', component: AsignacionRolComponent },
  { path: 'reunion', component: ReunionComponent },
  { path: 'evento-deportivo', component: EventoDeportivoComponent },
  { path: 'menu-rol', component: MenuRolComponent },
  // { path: 'menu-reunion', component: MenuReunionComponent },
  { path: 'menu-deporte', component: MenuDeporteComponent },
  { path: 'multimedia', component: MultimediaComponent },
  { path: 'directiva', component: DirectivaComponent },
  { path: 'categoria', component: CategoriaComponent },
  // { path: 'menu-deportista', component: MenuDeportistaComponent },
  { path: 'gestor-solicitudes', component: GestorSolicitudesComponent },
  { path: 'mi-deporte', component: MiDeporteComponent },
  { path: 'gestor-deportistas', component: GestorDeportistasComponent },
  { path: 'menu-socios', component: MenuSociosComponent },
  { path: 'tipo-evento', component: TipoActividadComponent },
  // { path: 'menu-evento', component: MenuEventoDeportivoComponent },
  { path: 'mantenedor-directiva', component: MantenedorDirectivaComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'menu-tienda', component: MenuTiendaComponent},
  { path: 'noticias', component: NoticiasComponent },
  { path: 'gestor-socios', component: GestorSociosComponent },
  { path: 'noticia', component: NoticiaComponent},
  { path: 'galeria', component: GaleriaComponent},
  { path: 'fotos', component: FotosComponent},
  { path: 'galerias', component: GaleriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling:'enabled'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
