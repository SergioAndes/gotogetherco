import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";



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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
