import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthService } from '../../service/auth.service';
import { UserData } from '../../models/auth';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet, UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  visibleSidebar: boolean = false;
  user : UserData | undefined
  role : string | undefined
  

  constructor(private authService: AuthService) {}
  checkAuth = this.authService.isLoggedIn();

  ngOnInit() {
    this.getUserRole()
  }

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  getUserRole(){
    this.authService.getUserInformation().subscribe({
      next : (data) =>{
        this.user = data as UserData
        this.role = this.user.roleName
            

      },
      error : (error) =>{
        console.log(error)
      }
    });

  }
  onSidebarClose() {
    this.visibleSidebar = false;
  }
}
