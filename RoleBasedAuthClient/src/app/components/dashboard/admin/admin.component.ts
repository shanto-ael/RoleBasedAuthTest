

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Column, PageEvent, Role, UserData } from '../../../models/auth';
import { UserdefinedModule } from '../../../modules/userdefined/userdefined.module';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserdefinedModule, DialogModule, InputTextModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  first: number = 0;
  selectedUser: any = null;

  rows: number = 10;

  users: UserData[] = [];
  cols!: Column[];
  roles: Role[] | undefined;
  selectedRole: Role[] | undefined

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getAdminInformation();
    this.roles = [{
      name: 'Admin', id: 1
    },
    {
      name: 'User', id: 2
    }]
  }

  onPageChange(event: PageEvent) {

    this.first = event.first;
    this.rows = event.rows;
  }



  getAdminInformation() {
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
  getSeverity(role: string) {
    if (role == "Admin") {
      return "success";
    }
    else if (role == "User") {
      return "info";
    }
    else {
      return "danger";
    }
  }

  showDialog(user: any) {
    this.selectedUser = user
  }

  hideDialog() {
    this.selectedUser = null;
    console.log("hiding")
  }
  updateUserRole(user: any) {
    console.log(user)
    this.selectedUser = null
  }


}

