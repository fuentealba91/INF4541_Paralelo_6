import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorSociosComponent } from './gestor-socios.component';

describe('GestorSociosComponent', () => {
  let component: GestorSociosComponent;
  let fixture: ComponentFixture<GestorSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorSociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
