import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5000/api/";

  private http: HttpClient = inject(HttpClient);
  private platformId: Object = inject(PLATFORM_ID);

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currenUser$ = this.currentUserSource.asObservable();
  
  constructor() {}

  login(model: any){
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map(user => {
          if(user){
            if (isPlatformBrowser(this.platformId)){
              localStorage.setItem("user", JSON.stringify(user));
            }
            this.currentUserSource.next(user);
          }
        }
      )
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user => {
          if(user){
            if (isPlatformBrowser(this.platformId)){
              localStorage.setItem("user", JSON.stringify(user));
            }
            this.currentUserSource.next(user);
          }
        }
      )
    )
  }

  logout(){
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem("user");
    }
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
}
