import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionRolComponent } from './asignacion-rol.component';

describe('AsignacionRolComponent', () => {
  let component: AsignacionRolComponent;
  let fixture: ComponentFixture<AsignacionRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
