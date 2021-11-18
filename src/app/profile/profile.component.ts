import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nombre: string;
  description: string;
  id: any;
  imagesarray: any;
  edad: any;

  public registerForm: FormGroup;
  public test: boolean;
  private email: any;

  constructor(private socket: Socket,private route: Router, private formBuilder: FormBuilder, private authService: UserService) {
  }

  ngOnInit(): void {



    this.registerForm = this.formBuilder.group({
      image: [''],
    });

    const user = localStorage.getItem('user')

    const userparse = JSON.parse(user)
    this.nombre = userparse.first_name;
    this.description = userparse.description;
    this.id = userparse.id;
    this.edad = userparse.age;
    this.email=userparse.email;
    this.getImages();
    this.joinChat();
    console.log("a", this.imagesarray)


  }

    joinChat() {
      this.socket.emit('join', {username: this.email, room: 'room1'}, (error) => {
        if (error) {
          alert(error)
          location.href = '/'
        }
      })
    }

  public getImages() {
    console.log("d", this.description == null)
    const firstCreation = localStorage.getItem('firstCreation')
    const stack = [];
    this.authService.getImages(this.id, localStorage.getItem('token')).subscribe(data => {
      console.log("foto", data.profiles)
      const fotos = data.profiles;
      this.imagesarray = data
      if (fotos.length < 1) {
        Swal.fire({
          title: "Bienvenido a GoTogether!",
          text: "Antes de empezar, por favor edita tu descripcion y sube un par de fotos, asi tendras mas chance de hacer match!",
          icon: "info",
        });
        stack.push('https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg')
        this.imagesarray = stack;

      } else {
        if (this.description == null) {
          Swal.fire({
            title: "Bienvenido a GoTogether!",
            text: "Genial ahora edita tu perfil y agrega una descripcion",
            icon: "info",
          });

        }
        fotos.forEach(element =>
          stack.push(element.image));
        this.imagesarray = stack;

        if (firstCreation == 'true' && this.imagesarray.length > 0 && this.description != null) {
          Swal.fire({
            title: "Crea tu primer plan!",
            html: "Ya estamos listos para salir al ruedo. <br> " +
              "Dale click en el icono (+) que se encuentra en la parte superior derecha para crear un plan",
            icon: "info",
          });
          localStorage.setItem('firstCreation', 'false');
        }
      }

    }, error => {
      console.log('datadssd', error);
    });
  }

  goToEdit() {


    this.route.navigate(['editProfile']);
  }

  subirImagen(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file);
      Swal.fire({
        title: 'Uploading',
        html: 'Por favor espera mientras subimos tu imagen',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      });
      reader.onload = () => {
        console.log("dedeed98",reader.result.toString().split('base64,')[1])
        this.registerForm.get('image').setValue(reader.result.toString().split('base64,')[1]);
        this.authService.uploadImage(this.registerForm.value).subscribe(data => {
          Swal.fire('Success!', 'Foto subida correctamente', 'success');
          location.reload();
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });

      }
    }
  }
}
