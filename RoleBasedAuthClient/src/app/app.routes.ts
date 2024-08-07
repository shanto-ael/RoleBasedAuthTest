import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './components/dashboard/user/user.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            }, {
                path: 'profile',
                component: UserComponent,
                canActivate: [authGuard],
                data: { expectedRole: ['Admin', 'User'] }
            },
            {
                path: 'users',
                component: AdminComponent,
                canActivate: [authGuard],
                data: { expectedRole: 'Admin' }

            }]


    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: "full"
    }


];

