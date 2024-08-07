import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  const expectedRole = route.data['expectedRole'];
  const expectedRoles = Array.isArray(expectedRole) ? expectedRole : [expectedRole];

  if (Array.isArray(userRole)) {
    if (expectedRoles.some(role => userRole.includes(role))) {
      return true;
    }
  } else {
    if (expectedRoles.includes(userRole)) {
      return true;
    }
  }

  router.navigate(['/unauthorized']);
  return false;
};
