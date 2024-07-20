import { Routes } from '@angular/router';
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
import { FamiliesComponent } from './families/families.component';
import { CreateFamilyFormComponent } from './families/family-form/create-family-form/create-family-form.component';
import { EditFamilyFormComponent } from './families/family-form/edit-family-form/edit-family-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
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

  {
    path: 'families',
    component: FamiliesComponent,
  },
  {
    path: 'families/create',
    component: CreateFamilyFormComponent,
  },
  // {
  //   path: 'families/:familyId',
  //   component: FamilyInfoComponent,
  // },
  {
    path: 'families/:familyId/edit',
    component: EditFamilyFormComponent,
  },
];
