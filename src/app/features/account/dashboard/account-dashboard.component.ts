import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Account } from '../models/account.model';

/**
 * AccountDashboardComponent — mostra il saldo e i dati del conto corrente.
 * I dati vengono iniettati tramite l'input binding del resolver (withComponentInputBinding).
 */
@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './account-dashboard.component.html',
})
export class AccountDashboardComponent {
  account = input<Account | undefined>();
}
