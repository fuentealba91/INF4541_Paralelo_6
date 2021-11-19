import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeporteComponent } from './menu-deporte.component';

describe('MenuDeporteComponent', () => {
  let component: MenuDeporteComponent;
  let fixture: ComponentFixture<MenuDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
