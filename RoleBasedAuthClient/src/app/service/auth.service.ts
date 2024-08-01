import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, UserForm } from '../models/auth';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private api = environment.apiUrl;

  registerUser(userData: UserForm){
    return this.http.post(`${this.api}/Auth/register`, userData);    
  }
  loginUser(loginData: LoginForm){
    return this.http.post(`${this.api}/Auth/login`, loginData);
  }

  getAllUsers(){
    return this.http.get(`${this.api}/User/getalluser`);
  }

  getUserInformation(id: string){
    return this.http.get(`${this.api}/User/getuserbyid?id=${id}`);
  }
}
