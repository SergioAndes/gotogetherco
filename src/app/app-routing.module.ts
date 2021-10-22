import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {SwiperHomeComponent} from "./swiper-home/swiper-home.component";
import {ChatlistComponent} from "./chatlist/chatlist.component";
import {RegisterComponent} from "./register/register.component";
import {EventosManagerComponent} from "./eventos-manager/eventos-manager.component";
import {ProfileComponent} from "./profile/profile.component";



const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'swiper', component: SwiperHomeComponent},
  {path: 'chat', component: ChatlistComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'eventos-manager', component: EventosManagerComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
