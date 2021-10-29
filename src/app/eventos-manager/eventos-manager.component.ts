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
      console.log(data)
      console.log("id usuario",this.id)
      const match = new Match()
      data.EventMatch.forEach(element => {
        console.log("entra a event match")
        if (element.EventRequestUser.id == this.id) {
          match.user = element.EventUser[0]
        } else {
          match.user = element.EventRequestUser[0]
        }
        match.event=element.Event[0]
        this.matches.push(match)
      });
      data.EventRequestMatch.forEach(element => {
        console.log("entra a EventRequestMatch",element)
        if (element.EventRequestUser[0].id == this.id) {
          match.user = element.EventUser[0]
        } else {
          match.user = element.EventRequestUser[0]
        }
        match.event=element.Event[0]
        this.matches.push(match)
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
