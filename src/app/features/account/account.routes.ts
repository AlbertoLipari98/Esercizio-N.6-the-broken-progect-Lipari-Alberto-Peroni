import { Routes } from '@angular/router';
import { accountResolver } from './resolvers/account.resolver';
import { AccountDashboardComponent } from './dashboard/account-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { roleGuard } from 'src/app/core/guards/role.guard';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountDashboardComponent,
    resolve: { account: accountResolver },
    children: [
      {
        path: 'movimenti',
        component: TransactionsComponent,
        canActivate: [authGuard]
      },
    ],
  },
];
