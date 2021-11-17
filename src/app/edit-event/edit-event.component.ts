import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../services/evento.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() evento:any;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private eventoService: EventoService) { }

  ngOnInit(): void {
    console.log("evento",this.evento)
const reader = new FileReader();
    let a;
     reader.onload = () => {
          a = this.evento.image.reader.result.toString().split('base64,')[1]
      }

    this.registerForm = this.formBuilder.group({
      event_hour: [, [Validators.required]],
      description: [this.evento.description, [Validators.required]],
      event_date: [this.evento.event_date, [Validators.required]],
      gender_interest: [this.evento.gender_interest, [Validators.required]],
      image: [''],
      name: [this.evento.name,[Validators.required]],
    });
  }

  updateEvent() {
     this.eventoService.updateEvent(this.evento.id,this.registerForm.value).subscribe(data => {
       Swal.fire('Evento actualizado', 'la informacion de tu evento ha sido actualizada exitosamente', 'success');
     }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });

  }

    subirImagen(event) {
          const file = event.target.files[0];
      console.log('logo_asamblea', event.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerForm.get('image').setValue(reader.result.toString().split('base64,')[1]);
        console.log("base 64",reader.result.toString().split('base64,')[1])
      }
  }
}
