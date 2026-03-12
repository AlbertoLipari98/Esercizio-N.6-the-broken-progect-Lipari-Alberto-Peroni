import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly accounts: Account[] = [
    {
      id: 'ACC001',
      ownerId: '1',
      ownerName: 'Mario Rossi',
      balance: 15_234.5,
      currency: 'EUR',
      iban: 'IT60 X054 2811 1010 0000 0123 456',
    },
    {
      id: 'ACC002',
      ownerId: '2',
      ownerName: 'Admin Lipari',
      balance: 99_999.99,
      currency: 'EUR',
      iban: 'IT60 X054 2811 1010 0000 0654 321',
    },
  ];

  /**
   * Restituisce il conto associato all'utente con l'id specificato.
   * Simula una chiamata HTTP con un ritardo di 1 secondo (delay).
   */
  getAccountById(ownerId: string): Observable<Account | undefined> {
    const account = this.accounts.find((a) => a.ownerId === ownerId);
    return of(account).pipe(delay(1000));
  }

  


}
