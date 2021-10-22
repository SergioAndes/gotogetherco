import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperHomeComponent } from './swiper-home.component';

describe('SwiperHomeComponent', () => {
  let component: SwiperHomeComponent;
  let fixture: ComponentFixture<SwiperHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
