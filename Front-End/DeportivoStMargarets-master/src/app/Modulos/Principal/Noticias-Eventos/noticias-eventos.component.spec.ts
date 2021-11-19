import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasEventosComponent } from './noticias-eventos.component';

describe('NoticiasEventosComponent', () => {
  let component: NoticiasEventosComponent;
  let fixture: ComponentFixture<NoticiasEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiasEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
