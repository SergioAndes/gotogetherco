import {Component, OnInit} from '@angular/core';
import {EventoService} from "../services/evento.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-eventos-manager',
  templateUrl: './eventos-manager.component.html',
  styleUrls: ['./eventos-manager.component.css']
})
export class EventosManagerComponent implements OnInit {

  constructor(private route: Router, private eventoService: EventoService) {
  }

  id: any;
  solicitudes: any;
  public visible: any;
  public matches: any;

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.id = userparse.id;
    this.getEventos();
  }

  vibilidad(entero:any){
    this.visible=entero;
  }

  getEventos() {
    this.eventoService.getEventosXUsuario(this.id).subscribe(data => {
      console.log("eventoxusuario", data)
      this.solicitudes = data;
      //this.getMatches()
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  getMatches() {
    this.eventoService.getMatches(this.id).subscribe(data => {
      console.log("Matches", data)
      this.matches=data;
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
/*
    var newArray = this.solicitudes.filter(function (el) {
        return el.event_state != true
      }
    );
          console.log("filtrado",newArray)
*/
  }


  verSolicitud(solicitud: any) {
    this.route.navigate(['notifications', solicitud.id]);
  }
}
