import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { UserData } from '../../../models/auth';
import { UserdefinedModule } from '../../../modules/userdefined/userdefined.module';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserdefinedModule,NgbRatingModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers : [NgbRatingConfig]
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: UserData | undefined;
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

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
