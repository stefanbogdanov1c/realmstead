import { Routes } from '@angular/router';
import { ContinentsComponent } from './continents/continents.component';
import { KingdomsComponent } from './kingdoms/kingdoms.component';
import { KingdomDetailComponent } from './kingdom-detail/kingdom-detail.component';
import { NoblesComponent } from './nobles/nobles.component';
import { EditNobleFormComponent } from './nobles/noble-form/edit-noble-form/edit-noble-form.component';
import { NobleInfoComponent } from './nobles/noble-info/noble-info.component';
import { CreateNobleFormComponent } from './nobles/noble-form/create-noble-form/create-noble-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NoblesComponent,
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
];
