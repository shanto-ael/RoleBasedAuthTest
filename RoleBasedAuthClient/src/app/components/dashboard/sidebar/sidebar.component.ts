import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserdefinedModule } from '../../../modules/userdefined/userdefined.module';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserdefinedModule,PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  /**
   *
   */
  constructor(private router : Router) {

    
  }
  @Input() visible : boolean = false
  @Input() userRole: any;
  @Output() visibleChange = new EventEmitter<boolean>();
  items: MenuItem[] = [];
  activeRoute : string = ''

  ngOnInit(): void {
    this.getActiveRoutes()
    this.setMenuItems()
    
  }

  setMenuItems() {

    if (this.userRole.toLowerCase() === 'admin') {
      this.items = [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: 'profile',
          styleClass: this.isActive('profile')? 'active-link' : ''
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-users',
          routerLink: 'users',
          styleClass: this.isActive('users') ? 'active-link' : ''
        }
      ];
    } else if (this.userRole.toLowerCase() === 'user') {
      this.items = [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          routerLink: 'profile',
          
        }
      ];
    }
  }
  closeSidebar() {
    this.visibleChange.emit(false);
  }
  getActiveRoutes(){
    this.router.events.subscribe(() => this.activeRoute = this.router.url)
  }

  isActive(route: string): boolean {
    return this.activeRoute.endsWith(route);
  }
  
}
