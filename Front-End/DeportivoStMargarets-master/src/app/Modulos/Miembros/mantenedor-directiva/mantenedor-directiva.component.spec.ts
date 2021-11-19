import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorDirectivaComponent } from './mantenedor-directiva.component';

describe('MantenedorDirectivaComponent', () => {
  let component: MantenedorDirectivaComponent;
  let fixture: ComponentFixture<MantenedorDirectivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenedorDirectivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorDirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
