import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string;


  constructor() { }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    console.log('user',)
    const userparse = JSON.parse(user)
    this.nombre=userparse.first_name;
  }

}
