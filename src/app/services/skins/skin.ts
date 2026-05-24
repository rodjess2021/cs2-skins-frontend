import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Skin {

  private API_SERVER = "https://cs2-skins-backend.onrender.com/skin/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllSkins(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }
}
