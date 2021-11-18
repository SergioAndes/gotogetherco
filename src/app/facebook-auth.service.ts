import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";


@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {
  public registerForm: FormGroup;

  constructor(public profile: ProfileComponent, private zone: NgZone, private route: Router, private formBuilder: FormBuilder, private Auth: AngularFireAuth, private authService: UserService) {
    this.token = localStorage.getItem("nochiveToken")
  }

  fbProvider = new auth.FacebookAuthProvider();
  public token: any;

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);

    })
  }

  loginWithFB() {
    this.fbProvider.addScope('user_gender');
    this.fbProvider.addScope('user_birthday');
    this.Auth.auth.signInWithPopup(this.fbProvider)
      .then((result: any) => {
        const fbtoken = result.credential.accessToken
        console.log("tokens", fbtoken)
        let birdi = result.additionalUserInfo.profile.birthday;
        console.log("resilt", result)
        const tempsplit = birdi.split('/');
        const joinstring = "-";
        const newdate = tempsplit[2] + joinstring + tempsplit[0] + joinstring + tempsplit[1];
        console.log("resilt", newdate)
        let sex = "M"
        if (result.additionalUserInfo.profile.gender == "male") {
          sex = "H"
        }

        this.registerForm = this.formBuilder.group({
          first_name: [result.additionalUserInfo.profile.name, [Validators.required]],
          email: [result.additionalUserInfo.profile.email, [Validators.required]],
          sex: [sex, [Validators.required]],
          password: [result.additionalUserInfo.profile.id + "Qazwsx123$", [Validators.required]],
          birth_date: [newdate, [Validators.required]],
        });

        this.registerForm.get("email").setValue(this.registerForm.get("email").value.toLowerCase());
        console.log("pal envio", this.registerForm.value)

        this.authService.registerUser(this.registerForm.value).subscribe(datam => {
          this.authService.loginUser(result.additionalUserInfo.profile.email, result.additionalUserInfo.profile.id + "Qazwsx123$").subscribe(data => {
            localStorage.setItem('token', data.token);
            this.setFirebaseNOtificationKey(data.user);
            console.log('urser', data);
            if (localStorage.getItem('firstBrowse') != 'false') {
              localStorage.setItem('firstBrowse', 'true');
            }
            if (localStorage.getItem('firstCreation') != 'false') {
              localStorage.setItem('firstCreation', 'true');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('images', JSON.stringify(data.profile));
            this.authService.getFBimage(fbtoken, result.additionalUserInfo.profile.id).subscribe(image => {
              this.getBase64ImageFromUrl(image.data.url).then(image => {
                const tempsplit = image.toString().split(',');
                this.authService.uploadImage({image: tempsplit[1]}).subscribe(data => {

                  Swal.fire({
                    title: "Bienvenido a GoTogether!",
                    html: "Aqui puedes crear tu plan perfecto para salir con la persona perfecta.<br><br> No tienes un plan? no importa, " +
                      "acá tambien puedes unirte a planes que han sido creados por otros",
                    icon: "info",
                  }).then((result) => {
                    if (result.value) {
                          this.zone.run(() => {
                    this.route.navigate(['profile']);
                  });
                    }
                  });


                }, error => {
                  Swal.fire('Oops...', 'error en datos ingresados', 'error');
                  console.log('datadssd', error);
                });
              }, error => {
                Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
              });
            }, error => {
              Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
            });


          }, error => {
            Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
          });

        }, error => {
          if (error.status == 303) {
            this.authService.loginUser(result.additionalUserInfo.profile.email, result.additionalUserInfo.profile.id + "Qazwsx123$").subscribe(data => {
              localStorage.setItem('token', data.token);
              this.setFirebaseNOtificationKey(data.user);
              console.log('urser', data);
              if (localStorage.getItem('firstBrowse') != 'false') {
                localStorage.setItem('firstBrowse', 'true');
              }
              if (localStorage.getItem('firstCreation') != 'false') {
                localStorage.setItem('firstCreation', 'true');
              }

              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('images', JSON.stringify(data.profile));

              this.zone.run(() => {
                this.route.navigate(['profile']);
              });


            }, error => {
              Swal.fire('Oops...', 'Credenciales incorrectas', 'error');
            });
          }
        });

      })
      .catch(err => {
        console.log(err.message);
      })
  }

  setFirebaseNOtificationKey(user) {

    this.authService.updateUser1(user, this.token).subscribe(data => {
      console.log("usuario actualizado", data)

    }, error => {
      Swal.fire('Oops...', 'error en datos ingresados', 'error');
      console.log('datadssd', error);
    });


  }


}

