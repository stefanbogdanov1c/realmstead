import { Routes } from '@angular/router';
import { ContinentsComponent } from './continents/continents.component';
import { KingdomsComponent } from './kingdoms/kingdoms.component';
import { KingdomDetailComponent } from './kingdom-detail/kingdom-detail.component';

export const routes: Routes = [
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
  }
];
