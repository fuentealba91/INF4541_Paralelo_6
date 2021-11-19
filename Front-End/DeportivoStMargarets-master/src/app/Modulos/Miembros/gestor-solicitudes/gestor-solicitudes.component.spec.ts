import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorSolicitudesComponent } from './gestor-solicitudes.component';

describe('GestorSolicitudesComponent', () => {
  let component: GestorSolicitudesComponent;
  let fixture: ComponentFixture<GestorSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
