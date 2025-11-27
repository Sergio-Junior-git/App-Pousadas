import { inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
    const platformId = inject(PLATFORM_ID);

    // SSR? sempre permitir
    if (!isPlatformBrowser(platformId)) return true;

    const tokenService = inject(TokenService);
    const router = inject(Router);

    if (!tokenService.getToken()) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
