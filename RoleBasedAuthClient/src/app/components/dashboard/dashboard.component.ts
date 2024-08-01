import { Component, OnInit, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Column, UserData } from '../../models/auth';
import { AuthService } from '../../service/auth.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { Sidebar } from 'primeng/sidebar';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableModule, TagModule, NavbarComponent,PanelModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  user : UserData | undefined;
  users : UserData[] = [];
  role : string = "";
  cols!: Column[];


  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getToken(): string {
    return localStorage.getItem('token') ?? "";
  }
  getDecodedToken(): any {
    const token = this.getToken();
    if(token == ""){
      return {};
    }
    console.log(jwtDecode(token));
    return jwtDecode(token);
  }



  getUserData(): any {
    const decodedToken = this.getDecodedToken();
    var id =  decodedToken['Id'];
    this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if(this.role == "Admin"){
      debugger;
      this.authService.getAllUsers().subscribe(
        {
          next: (data) => {
            this.cols = [
              { field: 'userName', header: 'Username' },
              { field: 'email', header: 'Email' },
              { field: 'roleName', header: 'Role' }
            ];
            this.users = data as UserData[];
            console.log(this.users);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )   

    }
    else{
      this.authService.getUserInformation(id).subscribe(
        {
          next: (data) => {
            this.user = data as UserData;
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }
      

  }
  getSeverity(role: string) {
    if(role == "Admin"){
      return "success";
    }
    else if(role == "User"){
      return "info";
    }
    else{
      return "danger";
    }



  }
}
