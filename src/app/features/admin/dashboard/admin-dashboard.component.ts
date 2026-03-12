import { Component } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth.service';

interface AdminUser extends User {
  email: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="admin-dashboard">
      <div class="admin-header">
        <h2>🔑 Pannello Amministratore</h2>
        <p>Gestione utenti e accessi — Lipari Bank</p>
      </div>

      <div class="users-table">
        <h3>Utenti Registrati</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Ultimo accesso</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            @for (user of mockUsers; track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="badge" [class]="user.role">{{ user.role }}</span>
                </td>
                <td>{{ user.lastLogin }}</td>
                <td>
                  <span class="badge" [class]="user.status">
                    {{ user.status === 'active' ? '✅ Attivo' : '⛔ Inattivo' }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {
  currentAdmin = this.authService.getCurrentUser();

  mockUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Mario Rossi',
      role: 'customer',
      email: 'mario.rossi@example.it',
      lastLogin: '04/04/2025 09:32',
      status: 'active',
    },
    {
      id: '2',
      name: 'Admin Lipari',
      role: 'admin',
      email: 'admin@liparibank.it',
      lastLogin: '04/04/2025 10:15',
      status: 'active',
    },
    {
      id: '3',
      name: 'Laura Bianchi',
      role: 'customer',
      email: 'laura.bianchi@example.it',
      lastLogin: '02/04/2025 14:00',
      status: 'active',
    },
    {
      id: '4',
      name: 'Giovanni Verdi',
      role: 'customer',
      email: 'g.verdi@example.it',
      lastLogin: '15/03/2025 08:45',
      status: 'inactive',
    },
  ];

  constructor(private authService: AuthService) {}
}
