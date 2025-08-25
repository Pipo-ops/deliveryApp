import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="success-wrap">
      <mat-icon class="ok">check_circle</mat-icon>
      <h1>Ihre Bestellung wurde gesendet</h1>
      <p>Vielen Dank! Wir benachrichtigen Sie, sobald das Restaurant bestätigt.</p>
      <button mat-raised-button color="primary" (click)="goOn()">Weiter bestellen</button>
    </div>
  `,
  styles: [`
    .success-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;padding:48px 16px;text-align:center}
    .ok{font-size:72px;width:72px;height:72px}
  `]
})
export class OrderSuccessComponent {

  constructor(private router: Router) {}

  goOn() { 
    this.router.navigate(['/order']); 
  }
}