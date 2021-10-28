import {Component, OnInit} from '@angular/core';
import SwiperCore, {Pagination} from 'swiper';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../services/evento.service";
import {UserService} from "../services/user.service";

class Evento {
  evento: any;
  usuario: any;
  images: any;
}


SwiperCore.use([Pagination]);

@Component({
  selector: 'app-swiper-home',
  templateUrl: './swiper-home.component.html',
  styleUrls: ['./swiper-home.component.css']
})

export class SwiperHomeComponent implements OnInit {
  public eventos: Array<Evento> = [];
  public registerForm: FormGroup;
  public userid;

  contador: any = 0;

  constructor(private formBuilder: FormBuilder, private eventoService: EventoService, private userService: UserService) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.userid=userparse.id
    this.getEventos()

  }

  onSwiper(swiper) {
    const cont = 1;
    this.contador = this.contador + 1
    console.log(this.contador);
  }

  getEventos() {
    this.eventoService.getEventos().subscribe(data => {
      data.forEach(element => {
        console.log("evento",data)
        this.userService.getUserById(element.user_id).subscribe(dataz => {
          console.log("user",dataz)
          this.userService.getImages(dataz[0].id,localStorage.getItem('token')).subscribe(datax => {
            console.log("perfiles",datax)
            const evento = new Evento();
            evento.evento = element;
            evento.usuario = dataz[0];
            evento.images = datax.profiles;
            this.eventos.push(evento);
          }, error => {
            Swal.fire('Oops...', 'error en datos ingresados', 'error');
            console.log('datadssd', error);
          });
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });
      });
      console.log('eventos poderosos', this.eventos);
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  postulate(eventoid:any) {
    console.log("usurio",this.userid)
    console.log("evento",eventoid)
    this.eventoService.createRequest(eventoid,this.userid).subscribe(data => {
      console.log("posti",data)
      Swal.fire('success', 'Postulacion exitosa! Cruza los dedos para que acepten tu solicitd', 'success');
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });

  }
}

