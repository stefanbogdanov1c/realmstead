import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-go-back-form-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button type="button" (click)="onGoBack()" class="btn-danger w-full cursor-pointer">
      Go Back
    </button>
  `,
  styles: ``,
})
export class GoBackFormButtonComponent {
  location = inject(Location);

  onGoBack() {
    this.location.back()
  }
}
