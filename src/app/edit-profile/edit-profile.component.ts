import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private id: any;
  public images: any;


  constructor(private authService: UserService, private formBuilder: FormBuilder, private route: Router) {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.id = userparse.id;
  }

  public registerForm: FormGroup;
  first_name: string;
  sex: string;
  description: string;
  idUser: any;
  bithday: any;

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.first_name = userparse.first_name;
    this.sex = userparse.sex;
    this.description = userparse.description;
    this.idUser = userparse.id;
    this.bithday = userparse.birth_date;
    this.getImages();


    this.registerForm = this.formBuilder.group({
      first_name: [userparse.first_name, [Validators.required]],
      sex: [userparse.sex, [Validators.required]],
      description: [userparse.description, [Validators.required]],
      birth_date: [userparse.birth_date, [Validators.required]],
      image: [],
    });
  }

  editEvent() {
    console.log("log", this.registerForm.value)

    try {
      this.registerForm.get("birth_date").setValue(this.registerForm.get("birth_date").value.toISOString().split('T')[0]);
    } catch {
    }

    this.authService.updateUser(this.registerForm.value, this.idUser).subscribe(data => {
      console.log("data", data)
      localStorage.setItem('user', JSON.stringify(data));
      Swal.fire('Success!', 'Datos actualizados correctamente!', 'success');
      this.route.navigate(['profile']);
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });

  }

  getImages() {
    this.authService.getImages(this.id, localStorage.getItem('token')).subscribe(data => {
      console.log("imagen", data)
      this.images = data.profiles;
    }, error => {
      console.log('datadssd', error);
    });
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
        console.log("dedeed98", reader.result.toString().split('base64,')[1])
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

  deleteImage(id: any) {

  }
}
