import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {EventoService} from "../services/evento.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private eventoService: EventoService) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)

    this.registerForm = this.formBuilder.group({
      event_hour: ['', [Validators.required]],
      description: ['', [Validators.required]],
      event_date: ['', [Validators.required]],
      gender_interest: ['', [Validators.required]],
      event_type: [1, [Validators.required]],
      event_state: [1, [Validators.required]],
      image: [''],
      user_id: [userparse.id],
      subscription_date: ['2021-02-02'],
      conditions: [1],
      name: ['',[Validators.required]],
    });
  }

  subirImagen(event) {
          const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.get('image').setValue(reader.result.toString().split('base64,')[1]);
      }
  }


  createEvent(): void{
    let a=this.registerForm.get('event_date').value.toISOString().slice(0, 10);;
    this.registerForm.get('event_date').setValue(a)
    console.log("creacr",this.registerForm.value)
    this.eventoService.createEvent(this.registerForm.value).subscribe(data => {
      console.log("darta resul",data )
      Swal.fire('Success', 'Evento Creado Exitosamente', 'success');
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }



}
