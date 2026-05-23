import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Arma {
  private API_SERVER = "http://localhost:8080/arma/";

  constructor(
    private httpClient: HttpClient
  ) { }

  //guarda armas
  public save(arma: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, arma)
  }

  //trae las armas guardadas
  public getAllArmas(): Observable<any> {
  return this.httpClient.get(this.API_SERVER);
}
}
