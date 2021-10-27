import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SwiperHomeComponent } from './swiper-home/swiper-home.component';
import { SwiperModule } from 'swiper/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ChatlistComponent } from './chatlist/chatlist.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EventosManagerComponent } from './eventos-manager/eventos-manager.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import { ProfileComponent } from './profile/profile.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HomeComponent,
    LoginComponent,
    SwiperHomeComponent,
    NavbarComponent,
    ChatlistComponent,
    RegisterComponent,
    EventosManagerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
