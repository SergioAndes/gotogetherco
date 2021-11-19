import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {SwiperHomeComponent} from "./swiper-home/swiper-home.component";
import {ChatlistComponent} from "./chatlist/chatlist.component";
import {RegisterComponent} from "./register/register.component";
import {EventosManagerComponent} from "./eventos-manager/eventos-manager.component";
import {ProfileComponent} from "./profile/profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {CreateEventComponent} from "./create-event/create-event.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {AuthGuard} from "./services/auth.guard";



const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'swiper', component: SwiperHomeComponent,canActivate:[AuthGuard]},
  {path: 'chat', component: ChatlistComponent,canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent,canActivate:[AuthGuard]},
  {path: 'eventos-manager', component: EventosManagerComponent,canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'editProfile', component: EditProfileComponent,canActivate:[AuthGuard]},
  {path: 'createEvent', component: CreateEventComponent,canActivate:[AuthGuard]},
  {path: 'notifications/:idEvento', component: NotificationsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
