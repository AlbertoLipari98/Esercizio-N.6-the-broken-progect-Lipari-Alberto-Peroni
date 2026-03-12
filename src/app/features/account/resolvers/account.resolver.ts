import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';

export const accountResolver: ResolveFn<Account | undefined> = () => {
  const authService = inject(AuthService);
  const accountService = inject(AccountService);
  const router = inject(Router);

  const userId = authService.getCurrentUser()?.id;
  if (!userId) {
    router.navigate(['/login']);
    return EMPTY;
  }

  return accountService.getAccountById(userId).pipe(
    catchError(() => {
      router.navigate(['/login']);
      return EMPTY;
    })
  );
};
