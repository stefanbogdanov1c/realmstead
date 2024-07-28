import { Routes } from '@angular/router';
import { KingdomsComponent } from './kingdoms/kingdoms.component';
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
import { FamilyInfoComponent } from './families/family-info/family-info.component';
import { CreateKingdomFormComponent } from './kingdoms/kingdom-form/create-kingdom-form/create-kingdom-form.component';
import { EditKingdomFormComponent } from './kingdoms/kingdom-form/edit-kingdom-form/edit-kingdom-form.component';
import { KingdomInfoComponent } from './kingdoms/kingdom-info/kingdom-info.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  // Nobles routes
  {
    path: 'nobles',
    children: [
      {
        path: '',
        component: NoblesComponent,
      },
      {
        path: 'create',
        component: CreateNobleFormComponent,
      },
      {
        path: ':nobleId',
        component: NobleInfoComponent,
      },
      {
        path: ':nobleId/edit',
        component: EditNobleFormComponent,
      },
    ],
  },
  // Cities routes
  {
    path: 'cities',
    children: [
      {
        path: '',
        component: CitiesComponent,
      },
      {
        path: 'create',
        component: CreateCityFormComponent,
      },
      {
        path: ':cityId',
        component: CityInfoComponent,
      },
      {
        path: ':cityId/edit',
        component: EditCityFormComponent,
      },
    ],
  },
  // Families routes
  {
    path: 'families',
    children: [
      {
        path: '',
        component: FamiliesComponent,
      },
      {
        path: 'create',
        component: CreateFamilyFormComponent,
      },
      {
        path: ':familyId',
        component: FamilyInfoComponent,
      },
      {
        path: ':familyId/edit',
        component: EditFamilyFormComponent,
      },
    ],
  },
  // Kingdoms routes
  {
    path: 'kingdoms',
    children: [
      {
        path: '',
        component: KingdomsComponent,
      },
      {
        path: 'create',
        component: CreateKingdomFormComponent,
      },
      {
        path: ':kingdomId',
        component: KingdomInfoComponent,
      },
      {
        path: ':kingdomId/edit',
        component: EditKingdomFormComponent,
      },
    ],
  },
];
