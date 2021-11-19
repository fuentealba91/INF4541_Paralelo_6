import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSociosComponent } from './menu-socios.component';

describe('MenuSociosComponent', () => {
  let component: MenuSociosComponent;
  let fixture: ComponentFixture<MenuSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
