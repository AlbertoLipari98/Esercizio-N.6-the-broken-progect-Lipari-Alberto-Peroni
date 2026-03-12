import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Account } from '../models/account.model';

/**
 * AccountDashboardComponent — mostra il saldo e i dati del conto corrente.
 * I dati vengono iniettati tramite l'input binding del resolver (withComponentInputBinding).
 */
@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './account-dashboard.component.html',
})
export class AccountDashboardComponent {
  account = input<Account | undefined>();
}
