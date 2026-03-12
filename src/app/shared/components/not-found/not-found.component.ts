import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="error-code">404</div>
      <h2>Pagina non trovata</h2>
      <p>La pagina che stai cercando non esiste o è stata spostata.</p>
      <a routerLink="/dashboard">
        <button class="btn-primary" style="margin-top: 16px;">
          Torna alla Dashboard
        </button>
      </a>
    </div>
  `,
})
export class NotFoundComponent {}
