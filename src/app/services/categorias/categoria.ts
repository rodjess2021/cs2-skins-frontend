import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Categoria {

  private API_SERVER = "https://cs2-skins-backend.onrender.com/categoria/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllCategorias(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }
}
