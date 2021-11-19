import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTiendaComponent } from './menu-tienda.component';

describe('MenuTiendaComponent', () => {
  let component: MenuTiendaComponent;
  let fixture: ComponentFixture<MenuTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
