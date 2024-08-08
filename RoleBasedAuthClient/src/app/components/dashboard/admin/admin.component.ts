import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Column, PageEvent, UserData } from '../../../models/auth';
import { UserdefinedModule } from '../../../modules/userdefined/userdefined.module';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [UserdefinedModule,DialogModule, InputTextModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

    first: number = 0;

    rows: number = 10;

  users : UserData[] = [];
  cols!: Column[];
  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.getAdminInformation();
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
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

}
