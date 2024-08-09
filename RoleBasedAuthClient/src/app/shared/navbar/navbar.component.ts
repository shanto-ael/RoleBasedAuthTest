import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserdefinedModule } from '../../modules/userdefined/userdefined.module';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserData } from '../../models/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserdefinedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router =  inject(Router)
  @Input() userInfo : UserData | undefined
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(){}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  LogOut() {
    console.log(this.userInfo)
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    
    }

  }