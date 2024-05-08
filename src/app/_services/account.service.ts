import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5000/api/";

  private http: HttpClient = inject(HttpClient);
  
  constructor() {}

  login(model: any){
    return this.http.post(this.baseUrl + "account/login", model);
  }
}
