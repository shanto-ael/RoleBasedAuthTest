import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserData } from '../../../models/auth';
import { UserdefinedModule } from '../../../modules/userdefined/userdefined.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserdefinedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: UserData | undefined;

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() {
    this.authService.getUserInformation().subscribe({
      next: (data) => {
        this.user = data as UserData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
