import {Component, Input, OnInit} from '@angular/core';
import {EventoService} from "../services/evento.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

class Match {
  user: any;
  event: any;
}

@Component({
  selector: 'app-eventos-manager',
  templateUrl: './eventos-manager.component.html',
  styleUrls: ['./eventos-manager.component.css']
})
export class EventosManagerComponent implements OnInit {

  constructor(private route: Router, private eventoService: EventoService) {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.id = userparse.id;
    this.getEventos();
    this.getMatches();

  }

  id: any;
  solicitudes: any;
  public visible: any;
  public matches: Array<Match> = [];


  ngOnInit(): void {

  }

  vibilidad(entero: any) {
    this.visible = entero;
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
      console.log("id usuario", this.id)

      data.EventMatch.forEach(element => {
        const match = new Match()
        match.event = element.Event[0]
        console.log("entra a event match", element)
        console.log(element.EventRequestUser.length)
        console.log(element.EventUser.length)
        if (element.EventRequestUser.length != 0 && element.EventUser.length != 0) {
          console.log("entra a event 11", element)
          if (element.EventUser[0].id != this.id) {
            match.user = element.EventUser[0]
            this.matches.push(match)
          } else {
            match.user = element.EventRequestUser[0]
            this.matches.push(match)
          }
        }

        console.log("Mtaches actualizados 1", this.matches)
      });
      data.EventRequestMatch.forEach(element => {
         const match = new Match()
        match.event = element.Event[0]
        if (element.EventRequestUser.length != 0 && element.EventUser.length != 0) {
          console.log("entra a event 11", element)
          if (element.EventUser[0].id != this.id) {
            match.user = element.EventUser[0]
            this.matches.push(match)
          } else {
            match.user = element.EventRequestUser[0]
            this.matches.push(match)
          }
        }

      });
      console.log("Mtaches actualizados", this.matches)


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
