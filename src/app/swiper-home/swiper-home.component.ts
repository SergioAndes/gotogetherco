import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-swiper-home',
  templateUrl: './swiper-home.component.html',
  styleUrls: ['./swiper-home.component.css']
})
export class SwiperHomeComponent implements OnInit {
  eventos: string[] = ['Apple', 'Orange', 'Banana'];

  constructor() { }

  ngOnInit(): void {
  }

}
