import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FamilyFormComponent } from '../family-form.component';

@Component({
  selector: 'app-create-family-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FamilyFormComponent],
  templateUrl: 'create-family-form.component.html',
  styles: ``,
})
export class CreateFamilyFormComponent { }
