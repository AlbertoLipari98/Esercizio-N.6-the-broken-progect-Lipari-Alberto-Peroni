import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Benvenuto in Lipari Bank</h2>
        <p>Scegli il profilo con cui vuoi accedere</p>

        <div class="btn-group">
          <button class="btn-primary" (click)="loginAsCustomer()">
            👤 Entra come Cliente
          </button>
          <button class="btn-secondary" (click)="loginAsAdmin()">
            🔑 Entra come Admin
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginAsCustomer(): void {
    this.authService.login('customer');
    this.router.navigate(['/dashboard']);
  }

  loginAsAdmin(): void {
    this.authService.login('admin');
    this.router.navigate(['/admin']);
  }
}
