import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpService } from '../http.service';
import { City } from '../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteCity,
  fetchAllCities,
  selectAllCities,
} from '../app.store';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'cities.component.html',
  styles: ``,
})
export class CitiesComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject(Router);

  ngOnInit() {
    this.store.dispatch(fetchAllCities());
  }

  cities$: Observable<City[]> = this.store.pipe(select(selectAllCities));

  onDeleteCity(id: string) {
    this.store.dispatch(deleteCity({ id }));
  }

  onEditCity(city: City) {
    this.router.navigate(['/cities', city._id, 'edit']);
  }

  onOpenCityInfo(city: City) {
    this.router.navigate(['/cities', city._id]);
  }

  onCreateCity() {
    this.router.navigate(['/cities', 'create']);
  }
}
