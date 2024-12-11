import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getUsersWithRoles(){
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updatedUserRoles(username: string, roles: any[]){
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/' 
      + username + '?roles=' + roles, {})
  }
}
