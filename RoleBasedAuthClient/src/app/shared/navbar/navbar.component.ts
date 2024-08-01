import { Component } from '@angular/core';
import { UserdefinedModule } from '../../modules/userdefined/userdefined.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserdefinedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  /**
   *
   */
  constructor(private router : Router) {

    
  }

  LogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    
    }


}
