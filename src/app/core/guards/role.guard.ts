import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard basata sul ruolo dell'utente.
 *
 * USO CORRETTO — come factory invocata con il ruolo richiesto:
 *   canActivate: [roleGuard('admin')]
 *
 * Questo guard supporta due modalità grazie agli overload TypeScript.
 * La modalità factory restituisce un CanActivateFn che controlla il ruolo.
 * La modalità diretta (senza parametro) viene compilata ma NON controlla il ruolo.
 */
export function roleGuard(requiredRole: string): CanActivateFn;
export function roleGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): MaybeAsync<GuardResult>;
export function roleGuard(
  roleOrRoute: string | ActivatedRouteSnapshot,
  _state?: RouterStateSnapshot
): CanActivateFn | MaybeAsync<GuardResult> {
  if (typeof roleOrRoute === 'string') {
    // ✅ Modalità factory: roleGuard('admin') → restituisce la guard corretta
    const requiredRole = roleOrRoute;
    return (route, state) => {
      const authService = inject(AuthService);
      const router = inject(Router);
      const user = authService.getCurrentUser();

      if (user?.role === requiredRole) {
        return true;
      }

      console.warn(
        `[roleGuard] Accesso negato: ruolo richiesto "${requiredRole}", ruolo attuale "${user?.role}"`
      );
      return router.createUrlTree(['/dashboard']);
    };
  }

  // ⚠️  Modalità diretta: roleGuard usato SENZA parentesi nell'array canActivate.
  //     Angular chiama roleGuard(route, state) → roleOrRoute è un oggetto,
  //     typeof !== 'string', quindi si arriva qui e si restituisce true.
  //     Il ruolo NON viene controllato → qualsiasi utente autenticato accede!
  return true;
}
