import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-go-back-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button class="btn-info w-full" (click)="onGoBack()">Go Back</button>
  `,
  styles: ``,
})
export class GoBackButtonComponent {
  location = inject(Location);

  onGoBack() {
    this.location.back()
  }
}
