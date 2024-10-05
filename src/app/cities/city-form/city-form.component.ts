import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { City } from '../../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNewCity, updateCity } from '../../app.store';
import { GoBackFormButtonComponent } from '../../shared/go-back-form-button/go-back-form-button.component';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoBackFormButtonComponent],
  templateUrl: 'city-form.component.html',
  styles: ``,
})
export class CityFormComponent implements OnChanges {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  @Input() city: City | null = null;

  cityForm = this.fb.group({
    name: ['', Validators.required],
    population: [0, Validators.min(0)],
    description: [''],
  });

  ngOnChanges(): void {
    if (this.city) {
      this.populateForm(this.city);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.cityForm.reset({
      name: '',
      population: 0,
      description: '',
    });
  }

  populateForm(city: City): void {
    this.cityForm.patchValue({
      name: city.name,
      population: city.population,
      description: city.description,
    });
  }

  onSubmit() {
    const cityFromForm = this.cityForm.value;

    if (!this.city) {
      this.store.dispatch(createNewCity(cityFromForm as City));
    } else {
      const city = {
        _id: this.city!._id,
        ...cityFromForm,
      };
      this.store.dispatch(updateCity(city as City));
    }

    this.router.navigate(['cities']);
  }
}
