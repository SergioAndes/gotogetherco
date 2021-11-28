import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";
import {EventoService} from "../services/evento.service";
import {Router} from "@angular/router";
import SwiperCore, {EffectCards, EffectCube, Navigation, Pagination} from "swiper";
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {


  public registerForm: FormGroup;
  public visible: any;
  userid:any;
  public eventos: any;
  public templates: Array<any>;
  evento: any;

  constructor(private route: Router,private formBuilder: FormBuilder,private eventoService: EventoService) {
      this.visible=1;
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user')
    const userparse = JSON.parse(user)
    this.userid=userparse.id;
    this.getEventos();
    this.getTemplateEventos();

    this.registerForm = this.formBuilder.group({
      event_hour: ['', [Validators.required]],
      description: ['', [Validators.required]],
      event_date: ['', [Validators.required]],
      gender_interest: ['', [Validators.required]],
      event_type: [1, [Validators.required]],
      event_state: [1, [Validators.required]],
      image: ['',[Validators.required]],
      user_id: [userparse.id],
      subscription_date: ['2021-02-02'],
      conditions: [1],
      name: ['',[Validators.required]],
      fromTemplate: [''],
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
    let a = ""
    if(this.registerForm.get('event_date').value instanceof Date ){
      a=this.registerForm.get('event_date').value.toISOString().slice(0, 10);
    }else{
      a=this.registerForm.get('event_date').value.slice(0, 10);
    }
    
    this.registerForm.get('event_date').setValue(a)
    console.log("creacr",this.registerForm.value)
                Swal.fire({
        title: 'Uploading',
        html: 'Por favor espera mientras creamos tu evento',
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
    this.eventoService.createEvent(this.registerForm.value).subscribe(data => {
      console.log("darta resul",data )
      const firstBrowse = localStorage.getItem('firstBrowse')
      if(firstBrowse=='true'){
        Swal.fire('Bien, tu evento ya se encuentra publicado', 'Ahora puedes mirar y postularte a planes' +
          ' publicados por otros', 'success');
        localStorage.setItem('firstBrowse', 'false');
        this.route.navigate(['swiper']);
      }else{
        Swal.fire('Success', 'Evento Creado Exitosamente', 'success');
        this.route.navigate(['swiper']);
      }

    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }
  gotoUpdate(evento:any){
    this.evento=evento;
    this.visible=3;
  }

    getEventos() {
    this.eventoService.getEventosXUsuario(this.userid).subscribe(data => {
      console.log("eventoxusuario", data)
      this.eventos = data;
      //this.getMatches()
    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });
  }

  setTemplateEvento(id:string){
    const templateSeleted = this.templates.find(template => template.id == id)
    if(templateSeleted){
      this.registerForm.get("description").setValue(templateSeleted.description)
      this.registerForm.get("name").setValue(templateSeleted.name)
      this.registerForm.get("event_hour").setValue(templateSeleted.event_hour.substring(0,templateSeleted.event_hour.lastIndexOf(":")))
      this.registerForm.get("event_date").setValue(templateSeleted.event_date)
      this.registerForm.get("image").setValue(templateSeleted.image)
      this.registerForm.get("fromTemplate").setValue(id)
    }else{
      this.registerForm.reset()
    }
  }

  getTemplateEventos() {
    this.eventoService.getTemplateEventos().subscribe(data => {
      console.log("TemplateEvento", data)
      this.templates = data;
    }, error => {
      Swal.fire('Oops...', 'error obteniendo los templates', 'error');
      console.log('error obteniendo los templates', error);
    });
  }


  vibilidad(number: number) {
    this.visible=number;
  }

    verSolicitud(solicitud: any) {
    console.log("sssasa",solicitud)
        this.eventoService.getSolicitudes(solicitud).subscribe(data => {
      if(data.length==0){
Swal.fire('Oops...', 'parece que aun no hay personas interesadas en tu evento, dales un poco mas ' +
          'de tiempo', 'info');
      }else{
        this.route.navigate(['notifications', solicitud]);
      }
    }, error => {
      Swal.fire('Oops...', 'parece que aun no hay personas interesadas en tu evento, dales un poco mas ' +
          'de tiempo', 'info');
      console.log('datadssd', error);

    });
  }
}
