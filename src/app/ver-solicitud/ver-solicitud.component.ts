import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private authService: UserService ) { }
  public user: any;
  public fotos: any;

  ngOnInit(): void {
    this.user=this.data.idEvento.users.user_id
    this.getImages();

    console.log("sdds",this.data.idEvento.users.user_id)
  }

  getImages(){
    this.authService.getImages(this.user.id).subscribe(dataz => {
          console.log("fotos", dataz.profiles)
          this.fotos = dataz.profiles
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });
  }
}
