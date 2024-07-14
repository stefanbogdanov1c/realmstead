import { Routes } from '@angular/router';
import { ContinentsComponent } from './continents/continents.component';
import { KingdomsComponent } from './kingdoms/kingdoms.component';
import { KingdomDetailComponent } from './kingdom-detail/kingdom-detail.component';
import { NoblesComponent } from './nobles/nobles.component';
import { EditNobleFormComponent } from './nobles/noble-form/edit-noble-form/edit-noble-form.component';
import { NobleInfoComponent } from './nobles/noble-info/noble-info.component';
import { CreateNobleFormComponent } from './nobles/noble-form/create-noble-form/create-noble-form.component';
import { CitiesComponent } from './cities/cities.component';
import { CreateCityFormComponent } from './cities/city-form/create-city-form/create-city-form.component';
import { EditCityFormComponent } from './cities/city-form/edit-city-form/edit-city-form.component';
import { CityInfoComponent } from './cities/city-info/city-info.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'continents',
    component: ContinentsComponent,
  },
  {
    path: 'kingdoms',
    component: KingdomsComponent,
    children: [
      {
        path: ':kingdom',
        component: KingdomDetailComponent,
      }
    ],
  },
  {
    path: 'nobles',
    component: NoblesComponent,
  },
  {
    path: 'nobles/create',
    component: CreateNobleFormComponent,
  },
  {
    path: 'nobles/:nobleId',
    component: NobleInfoComponent,
  },
  {
    path: 'nobles/:nobleId/edit',
    component: EditNobleFormComponent,
  },

  {
    path: 'cities',
    component: CitiesComponent,
  },
  {
    path: 'cities/create',
    component: CreateCityFormComponent,
  },
  {
    path: 'cities/:cityId',
    component: CityInfoComponent,
  },
  {
    path: 'cities/:cityId/edit',
    component: EditCityFormComponent,
  },
];
