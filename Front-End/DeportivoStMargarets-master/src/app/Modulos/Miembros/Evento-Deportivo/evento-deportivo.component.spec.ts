import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDeportivoComponent } from './evento-deportivo.component';

describe('EventoDeportivoComponent', () => {
  let component: EventoDeportivoComponent;
  let fixture: ComponentFixture<EventoDeportivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoDeportivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
