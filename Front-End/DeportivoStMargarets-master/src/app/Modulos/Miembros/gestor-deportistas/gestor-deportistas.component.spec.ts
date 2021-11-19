import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDeportistasComponent } from './gestor-deportistas.component';

describe('GestorDeportistasComponent', () => {
  let component: GestorDeportistasComponent;
  let fixture: ComponentFixture<GestorDeportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorDeportistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorDeportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
