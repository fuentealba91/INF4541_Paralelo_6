import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamasComponent } from './ramas.component';

describe('RamasComponent', () => {
  let component: RamasComponent;
  let fixture: ComponentFixture<RamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
