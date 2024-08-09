import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent implements OnInit {

  constructor(private authService : AuthService,private router : Router) {
    
  }


  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn();
    if(!isLoggedIn){
      this.router.navigate(['/'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }

}
