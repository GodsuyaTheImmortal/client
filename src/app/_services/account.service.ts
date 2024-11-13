import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);
  private platformId: Object = inject(PLATFORM_ID);

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor() {}

  login(model: any){
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map(user => {
          if(user){
            this.setCurrentUser(user);
          }
        }
      )
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
      map(user => {
          if(user){
            this.setCurrentUser(user);
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
    if (isPlatformBrowser(this.platformId)){
      localStorage.setItem("user", JSON.stringify(user));
    }
    this.currentUserSource.next(user);
  }
}
