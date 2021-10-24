import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private URL_HOST = environment.urlBack;

  constructor(private http: HttpClient) { }

    createEvent(form: any): Observable<any> {
    return this.http.post(this.URL_HOST + 'events/create', form);
  }

  getEventos(): Observable<any> {
    return this.http.get(this.URL_HOST + 'events/GetEventsXType/1');
  }

}
