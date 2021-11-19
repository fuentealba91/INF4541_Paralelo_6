import { Location, ViewportScroller } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/Modulos/Miembros/persona.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginbtn!:boolean;
  logoutbtn!: boolean;
  public persona = null;
  
  constructor(private viewportScroller: ViewportScroller, private personaService: PersonaService)
  {
    personaService.getLoggedInName.subscribe((name: boolean) => this.changeName(name));
    if(this.personaService.isLoggedIn())
    {
      console.log("loggedin");
      this.loginbtn=false;
      this.logoutbtn = true;
      this.listarPerfil();
    }
    else
    {
      this.loginbtn=true;
      this.logoutbtn=false;
    }
  }

  listarPerfil()
  {
    if (this.logoutbtn == true)
    {
      let id: number = parseInt(sessionStorage.getItem("id") || '{}');
      this.personaService.detallePersona(id).subscribe
        (
          (datos: any) => this.persona = datos
      );
    }
  }

  onClickScroll(elementId: string) :void{
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void 
  {
    var nav = document.querySelector('nav');
    nav?.classList.add('bg-white', 'shadow');
  }

  private changeName(name: boolean): void 
  {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  
  logout()
  {
    sessionStorage.clear();
    this.personaService.deleteToken();
    window.location.href = "/inicio";
  }
}
