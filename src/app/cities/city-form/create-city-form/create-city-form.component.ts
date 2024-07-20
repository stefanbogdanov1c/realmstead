import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CityFormComponent } from '../city-form.component';

@Component({
  selector: 'app-create-city-form',
  standalone: true,
  imports: [CommonModule, RouterModule, CityFormComponent],
  templateUrl: 'create-city-form.component.html',
  styles: ``,
})
export class CreateCityFormComponent { }
