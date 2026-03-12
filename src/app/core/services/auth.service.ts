import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  role: 'customer' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly users: User[] = [
    { id: '1', name: 'Mario Rossi', role: 'customer' },
    { id: '2', name: 'Admin Lipari', role: 'admin' },
  ];

  currentUser = signal<User | null>(null);

  login(role: 'customer' | 'admin'): void {
    const user = this.users.find((u) => u.role === role) ?? null;
    this.currentUser.set(user);
  }

  logout(): void {
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
