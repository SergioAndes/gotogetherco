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
  contador: any =0;
  constructor() { }

  ngOnInit(): void {

  }

  onSwiper(swiper) {
    const cont=1;
    this.contador=this.contador+1
    console.log(this.contador);
  }
}
