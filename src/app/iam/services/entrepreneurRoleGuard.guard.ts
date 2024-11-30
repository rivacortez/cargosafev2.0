import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const entrepreneurRoleGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.currentUserRoles.pipe(
    take(1),
    map(roles => {
      if (roles.includes('ROLE_ENTREPRENEUR')) {
        return true;
      } else {
        router.navigate(['/home-entrepreneur']).then();
        return false;
      }
    })
  );
};
