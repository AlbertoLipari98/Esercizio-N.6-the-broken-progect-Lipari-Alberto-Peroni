import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  template: `
    <div class="transactions">
      <h3>Ultimi Movimenti</h3>
      <ul class="tx-list">
        @for (tx of transactions; track tx.id) {
          <li>
            <div>
              <div class="tx-description">{{ tx.description }}</div>
              <div class="tx-date">{{ tx.date | date: 'dd/MM/yyyy' }} · {{ tx.category }}</div>
            </div>
            <span
              class="tx-amount"
              [class.positive]="tx.amount > 0"
              [class.negative]="tx.amount < 0"
            >
              {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount | currency: 'EUR' : 'symbol' : '1.2-2' : 'it-IT' }}
            </span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class TransactionsComponent {
  transactions: Transaction[] = [
    {
      id: '1',
      description: 'Stipendio Aprile',
      amount: 2_500,
      date: new Date('2025-04-01'),
      category: 'Entrata',
    },
    {
      id: '2',
      description: 'Affitto Aprile',
      amount: -1_200,
      date: new Date('2025-04-03'),
      category: 'Casa',
    },
    {
      id: '3',
      description: 'Supermercato Esselunga',
      amount: -87.4,
      date: new Date('2025-04-07'),
      category: 'Spesa',
    },
    {
      id: '4',
      description: 'Ristorante Da Peppino',
      amount: -42,
      date: new Date('2025-04-10'),
      category: 'Ristorazione',
    },
    {
      id: '5',
      description: 'Rimborso spese viaggio',
      amount: 320,
      date: new Date('2025-04-15'),
      category: 'Rimborso',
    },
    {
      id: '6',
      description: 'Netflix abbonamento',
      amount: -17.99,
      date: new Date('2025-04-18'),
      category: 'Abbonamenti',
    },
  ];
}
