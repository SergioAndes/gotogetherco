import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {EventoService} from "../services/evento.service";
import {NotificationsComponent} from "../notifications/notifications.component";

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {
  public destinatarioid: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NotificationsComponent>,
              private authService: UserService, private eventoService: EventoService) {
  }

  public user: any;
  public fotos: any;

  ngOnInit(): void {
    this.user = this.data.idEvento.users.user_id
    this.getImages();

    console.log("solicitud", this.data.idEvento.users.id)
  }

  getImages() {
    this.authService.getImages(this.user.id, localStorage.getItem('token')).subscribe(dataz => {
      console.log("fotos", dataz.profiles)
      this.destinatarioid = dataz.profiles[0].owner
      this.fotos = dataz.profiles
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  acceptSolicitud() {
    this.eventoService.crearMatch(this.data.idEvento.users.id).subscribe(data => {
      this.authService.getUserById(this.destinatarioid).subscribe(dataz => {
        console.log("user destino", dataz[0])
        if (dataz[0].notificationToken != null) {
          console.log("entra")
          const body="Solicitud a plan aceptada!"
          const title="Han aceptado la solicitud al plan que te postulaste! entra a la app y chatea con esa persona para" +
            "cuadrar los detalles del encuentro "
          this.authService.sendPushnotification(dataz[0].notificationToken,body,title).subscribe(dataz => {
            console.log("respiesta",dataz)

          }, error => {
            Swal.fire('Oops...', 'error en datos ingresados', 'error');
            console.log('datadssd', error);
          });
        }

      }, error => {
        Swal.fire('Oops...', 'error en datos ingresados', 'error');
        console.log('datadssd', error);
      });

      console.log("match", data)
      Swal.fire('Success!', 'Genial! se habilitó un chat con tu match para que cuadren los detalles de su encuentro. Pasenla bien!', 'success');
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  close() {
    this.dialogRef.close();
  }
}
