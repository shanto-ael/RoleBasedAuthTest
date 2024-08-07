import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar'
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';




@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule, 
    InputTextModule,
    PasswordModule,
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
    MenubarModule,
    TableModule, 
    TagModule, 
    PanelModule,
    SidebarModule,
    AvatarModule,
    RippleModule,
    StyleClassModule
    
  ],
  providers: [MessageService]
})
export class UserdefinedModule { }
