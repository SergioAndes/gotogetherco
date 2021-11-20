import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import imageCompression from 'browser-image-compression';
import {MatDialogRef} from "@angular/material/dialog";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, AfterViewInit {
@ViewChild('angularCropper') public angularCropper: CropperComponent;
@ViewChild('uploader') public uploader: ElementRef<HTMLElement>;
  imageUrl: any;

  config=  {
    aspectRatio : 1/1,
    dragMode : 'move',
    background : true,
    movable: true,
    rotatable : true,
    scalable: true,
    zoomable: true,
    viewMode:3,
    autoCropArea: 0.9,
    cropBoxMovable: false,
    cropBoxResizable: false,
    checkCrossOrigin: false,checkImageOrigin : false,

  };
  imagennew: any;
  constructor(private authService: UserService,public dialogRef: MatDialogRef<EditProfileComponent>,private sanitizer: DomSanitizer) {

    console.log("ubrrr",this.imageUrl )
  }
  cropMoved(){
    this.imagennew = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
  }

  ngOnInit(): void {

  }
   ngAfterViewInit() {
        let el: HTMLElement = this.uploader.nativeElement;
    el.click();
  }
  deleteimag() {

}

  async subirImagen(event) {
    let file = event.target.files[0];
     const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 9999,
    useWebWorker: true
  }
    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    console.log(reader.readAsDataURL(compressedFile));
    reader.onload = () => {
      this.imageUrl = reader.result

    }

  }

  volver() {
    this.dialogRef.close()
  }

  Guardar() {
        this.authService.uploadImage({image:this.angularCropper.cropper.getCroppedCanvas().toDataURL().split('base64,')[1]}).subscribe(data => {
          Swal.fire('Success!', 'Foto subida correctamente', 'success');
          location.reload();
        }, error => {
          Swal.fire('Oops...', 'error en datos ingresados', 'error');
          console.log('datadssd', error);
        });

  }
}
