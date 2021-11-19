import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorContactoComponent } from './mantenedor-contacto.component';

describe('MantenedorContactoComponent', () => {
  let component: MantenedorContactoComponent;
  let fixture: ComponentFixture<MantenedorContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenedorContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
