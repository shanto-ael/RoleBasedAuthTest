import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, UserData, UserForm } from '../models/auth';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

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

  getUserInformation(): Observable<UserData> {
    return this.http.get<UserData>(`${this.api}/User/detail`);
  }
  getToken(): string {
    return localStorage.getItem('token') ?? "";
  }
  getDecodedToken(): any {
    const token = this.getToken();
    if(token == ""){
      return null;
    }
    return jwtDecode(token);
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return true;
  };

  getUserRole(): string | string[] {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) return [];
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }


}
