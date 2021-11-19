import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiDeporteComponent } from './mi-deporte.component';

describe('MiDeporteComponent', () => {
  let component: MiDeporteComponent;
  let fixture: ComponentFixture<MiDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiDeporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
