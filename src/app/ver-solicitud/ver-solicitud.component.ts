import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {EventoService} from "../services/evento.service";

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: UserService, private eventoService: EventoService) {
  }

  public user: any;
  public fotos: any;

  ngOnInit(): void {
    this.user = this.data.idEvento.users.user_id
    this.getImages();

    console.log("solicitud", this.data.idEvento.users.id)
  }

  getImages() {
    this.authService.getImages(this.user.id,localStorage.getItem('token')).subscribe(dataz => {
      console.log("fotos", dataz.profiles)
      this.fotos = dataz.profiles
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  acceptSolicitud() {
    this.eventoService.crearMatch(this.data.idEvento.users.id).subscribe(data => {
      console.log("match",data)
      Swal.fire('Success!', 'Genial! se habilitó un chat con tu match para que cuadren los detalles de su encuentro. Pasenla bien!', 'success');
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });

  }


}
