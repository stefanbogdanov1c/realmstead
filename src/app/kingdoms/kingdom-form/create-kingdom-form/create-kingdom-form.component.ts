import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KingdomFormComponent } from '../kingdom-form.component';

@Component({
  selector: 'app-create-kingdom-form',
  standalone: true,
  imports: [CommonModule, RouterModule, KingdomFormComponent],
  templateUrl: 'create-kingdom-form.component.html',
  styles: ``,
})
export class CreateKingdomFormComponent { }
