import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {SwiperHomeComponent} from "./swiper-home/swiper-home.component";



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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
