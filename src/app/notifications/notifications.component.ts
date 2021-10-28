import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {EventoService} from "../services/evento.service";
import Swal from "sweetalert2";
import {VerSolicitudComponent} from "../ver-solicitud/ver-solicitud.component";
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from "@angular/router";

class Solicitud {
  users: any
  foto: any
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  //public solicitudes: any;
  public solicitudes: Array<Solicitud> = [];
  public color = "red";

  constructor(private route: ActivatedRoute,public dialog: MatDialog,private eventoService: EventoService, private authService: UserService) {
  }

  ngOnInit(): void {
    //console.log("ds",this.route.getCurrentNavigation().extras.state.example); // should log out 'bar'
    this.getSolicitudes()
  }

  verSolicitud(solicitante): void {

    const dialogRef = this.dialog.open(VerSolicitudComponent, {
      width: '100%',
      height: '100%',
       data: {
        idEvento: solicitante,
      }
    });
  }

  getSolicitudes() {
    this.eventoService.getSolicitudes(this.route.snapshot.paramMap.get('idEvento')).subscribe(data => {

      data.forEach(element => {
        const solicitud = new Solicitud();
        solicitud.users = element;
        this.authService.getImages(element.user_id.id, localStorage.getItem('token')).subscribe(dataz => {
          console.log("fotos", dataz.profiles[0].image)
          solicitud.foto = dataz.profiles[0].image
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });
        this.solicitudes.push(solicitud)
      });

      console.log("soluciutdes", this.solicitudes)
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });

  }
}
