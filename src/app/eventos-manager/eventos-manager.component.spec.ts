import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosManagerComponent } from './eventos-manager.component';

describe('EventosManagerComponent', () => {
  let component: EventosManagerComponent;
  let fixture: ComponentFixture<EventosManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
