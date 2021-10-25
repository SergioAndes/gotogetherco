import { Component, OnInit } from '@angular/core';
import {EventoService} from "../services/evento.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-eventos-manager',
  templateUrl: './eventos-manager.component.html',
  styleUrls: ['./eventos-manager.component.css']
})
export class EventosManagerComponent implements OnInit {

  constructor(private route: Router,private eventoService: EventoService) { }
  id: any;
  solicitudes: any;

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.id = userparse.id;
    this.getEventos();
  }

  getEventos(){
    this.eventoService.getEventosXUsuario(this.id).subscribe(data => {
      console.log("mamabicho",data)
      this.solicitudes=data;
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  verSolicitud(solicitud: any) {
    this.route.navigate(['notifications',solicitud.id]);
  }
}
