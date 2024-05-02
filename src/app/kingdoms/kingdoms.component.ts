import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kingdoms',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <p>
      kingdoms works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class KingdomsComponent {

}
