import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
showFiller = false;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToCreateEvent(){
    this.route.navigate(['createEvent']);
  }

  goToSwiper(){
    this.route.navigate(['swiper']);
  }

  goToProfile() {
    this.route.navigate(['profile']);
  }

  goToEventManare() {
    this.route.navigate(['eventos-manager']);
  }

  goHome() {
    this.route.navigate(['swiper']);
  }
}
