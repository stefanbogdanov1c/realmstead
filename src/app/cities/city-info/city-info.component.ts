import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../http.service';
import { City } from '../../types';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  deleteCity,
  fetchAllCities,
  selectCityById,
} from '../../app.store';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';

@Component({
  selector: 'app-city-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoBackButtonComponent],
  templateUrl: 'city-info.component.html',
  styles: ``,
})
export class CityInfoComponent implements OnInit {
  httpService = inject(HttpService);
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);

  city: City | null = null;

  ngOnInit(): void {
    this.store.dispatch(fetchAllCities());
    this.route.paramMap.subscribe(params => {
      const id = params.get('cityId');
      if (id) {
        this.store.select(selectCityById(id)).subscribe(city => {
          if (city !== undefined) {
            this.city = city;
          }
        });
      } else {
        this.router.navigate(['/cities']);
      }
    });
  }

  onDeleteCity(id: string) {
    this.store.dispatch(deleteCity({ id }));
    this.router.navigate(['/cities']);
  }

  onEditCity(id: string) {
    this.router.navigate(['/cities', id, 'edit']);
  }
}
