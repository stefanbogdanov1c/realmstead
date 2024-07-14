import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../../http.service';
import { City } from '../../../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNewCity } from '../../../app.store';
import { CityFormComponent } from '../city-form.component';

@Component({
  selector: 'app-create-city-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CityFormComponent],
  templateUrl: 'create-city-form.component.html',
  styles: ``,
})
export class CreateCityFormComponent {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);

  cityForm = this.fb.group({
    name: ['', Validators.required],
    population: [0, [Validators.required, Validators.min(0)]],
    description: ['']
  });

  onSubmit() {
    const cityFromForm = this.cityForm.value as City;
    this.store.dispatch(createNewCity(cityFromForm));
  }
}
